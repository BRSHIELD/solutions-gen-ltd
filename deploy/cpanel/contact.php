<?php
// Contact form handler for the static (cPanel) deployment.
// Receives the JSON the React form posts and emails it to the company inbox.
// Written for PHP 7.4+ so it runs on older shared-hosting defaults.
//
// Protections: POST + same-origin only, size limit, field validation, header
// injection stripping, honeypot field, Google reCAPTCHA v3 (when configured),
// and a per-visitor rate limit.

// Where submissions go, and the address they are sent from. The sender must be
// an address on this domain or the host's mail server will reject or spam-flag it.
const CONTACT_TO   = 'info@solutionsgen.co.ke';
const CONTACT_FROM = 'website@solutionsgen.co.ke';

const MAX_BODY_BYTES  = 20000;
const RATE_LIMIT      = 5;     // submissions allowed per visitor...
const RATE_WINDOW_SEC = 3600;  // ...per hour

// Optional settings file kept OUTSIDE public_html (see contact-config.example.php).
const CONFIG_FILE = __DIR__ . '/../contact-config.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond($status, $success, $message)
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// Header values must never contain line breaks (mail header injection).
function one_line($value)
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', (string) $value));
}

function load_config()
{
    $config = [];
    if (is_readable(CONFIG_FILE)) {
        $loaded = include CONFIG_FILE;
        if (is_array($loaded)) {
            $config = $loaded;
        }
    }
    $envSecret = getenv('RECAPTCHA_SECRET');
    if ($envSecret && empty($config['recaptcha_secret'])) {
        $config['recaptcha_secret'] = $envSecret;
    }
    return $config;
}

// Asks Google whether the token is genuine. Returns [ok(bool), reason(string)].
function recaptcha_verify($secret, $token, $ip, $minScore)
{
    $fields = http_build_query(['secret' => $secret, 'response' => $token, 'remoteip' => $ip]);
    $url    = 'https://www.google.com/recaptcha/api/siteverify';
    $raw    = false;

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $fields,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 10,
        ]);
        $raw = curl_exec($ch);
        curl_close($ch);
    } else {
        $ctx = stream_context_create(['http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $fields,
            'timeout' => 10,
        ]]);
        $raw = @file_get_contents($url, false, $ctx);
    }

    if ($raw === false) {
        return [false, 'verification service unreachable'];
    }
    $result = json_decode($raw, true);
    if (!is_array($result) || empty($result['success'])) {
        return [false, 'token rejected'];
    }
    if (isset($result['action']) && $result['action'] !== 'contact') {
        return [false, 'wrong action'];
    }
    $score = isset($result['score']) ? (float) $result['score'] : 1.0;
    if ($score < $minScore) {
        return [false, 'low score ' . $score];
    }
    return [true, ''];
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Method not allowed');
}

// Only accept posts made from this site's own pages.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $selfHost   = preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');
    if (!$originHost || strcasecmp($originHost, $selfHost) !== 0) {
        respond(403, false, 'Forbidden');
    }
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    respond(413, false, 'Request too large');
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, false, 'Invalid request');
}

$name     = one_line($data['name'] ?? '');
$email    = one_line($data['email'] ?? '');
$phone    = one_line($data['phone'] ?? '');
$service  = one_line($data['service'] ?? '');
$message  = trim((string) ($data['message'] ?? ''));
$honeypot = trim((string) ($data['website'] ?? ''));
$token    = one_line($data['recaptchaToken'] ?? '');
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// Honeypot: the "website" field is invisible to people, so anything in it is a
// bot. Pretend it worked so the bot moves on, but send nothing.
if ($honeypot !== '') {
    respond(200, true, 'Thank you for your message. We will get back to you soon.');
}

// Same rules the form enforces in the browser.
$nameLen    = function_exists('mb_strlen') ? mb_strlen($name) : strlen($name);
$messageLen = function_exists('mb_strlen') ? mb_strlen($message) : strlen($message);
if ($nameLen < 2 || $nameLen > 50) {
    respond(422, false, 'Please enter your name.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    respond(422, false, 'Please enter a valid email address.');
}
if (strlen($phone) > 30) {
    respond(422, false, 'Please enter a valid phone number.');
}
if ($service === '' || strlen($service) > 100) {
    respond(422, false, 'Please choose a service.');
}
if ($messageLen < 10 || $messageLen > 1000) {
    respond(422, false, 'Your message must be between 10 and 1000 characters.');
}

// reCAPTCHA v3, only when a secret key has been configured on the server.
$config = load_config();
$secret = isset($config['recaptcha_secret']) ? trim((string) $config['recaptcha_secret']) : '';
if ($secret !== '') {
    $minScore = isset($config['recaptcha_min_score']) ? (float) $config['recaptcha_min_score'] : 0.5;
    if ($token === '') {
        respond(422, false, 'Verification failed. Please reload the page and try again.');
    }
    list($ok, $reason) = recaptcha_verify($secret, $token, $ip, $minScore);
    if (!$ok) {
        error_log('contact.php: reCAPTCHA rejected submission from ' . $ip . ' (' . $reason . ')');
        respond(422, false, 'Verification failed. Please reload the page and try again, or email us directly.');
    }
}

// Simple per-visitor rate limit, kept in the server's temp folder.
$rateFile = rtrim(sys_get_temp_dir(), '/\\') . '/solutionsgen_contact_' . md5($ip) . '.json';
$now      = time();
$hits     = [];
if (is_readable($rateFile)) {
    $stored = json_decode((string) file_get_contents($rateFile), true);
    if (is_array($stored)) {
        foreach ($stored as $t) {
            if (is_int($t) && $t > $now - RATE_WINDOW_SEC) {
                $hits[] = $t;
            }
        }
    }
}
if (count($hits) >= RATE_LIMIT) {
    respond(429, false, 'Too many messages. Please try again later or email us directly.');
}

$subject = 'Website enquiry: ' . $service . ' - ' . $name;
$body    = "New message from the website contact form\n"
         . "------------------------------------------\n"
         . "Name:    {$name}\n"
         . "Email:   {$email}\n"
         . 'Phone:   ' . ($phone !== '' ? $phone : '(not given)') . "\n"
         . "Service: {$service}\n"
         . 'Sent:    ' . date('Y-m-d H:i:s T') . "\n"
         . "IP:      {$ip}\n\n"
         . "Message:\n{$message}\n";

$headers = [
    'From: Solutions General Website <' . CONTACT_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = @mail(CONTACT_TO, $encodedSubject, $body, implode("\r\n", $headers), '-f' . CONTACT_FROM);

if (!$sent) {
    error_log('contact.php: mail() failed for submission from ' . $email);
    respond(500, false, 'We could not send your message. Please email us directly.');
}

$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits), LOCK_EX);

respond(200, true, 'Thank you for your message. We will get back to you soon.');
