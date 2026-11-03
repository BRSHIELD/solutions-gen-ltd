<?php
// Copy this file to /home/<cpanel-user>/contact-config.php (one level ABOVE
// public_html, so it is never served to visitors) and fill in the values.
return [
    // Google reCAPTCHA v3 SECRET key from https://www.google.com/recaptcha/admin
    'recaptcha_secret'    => '',
    // Submissions scoring below this are treated as bots (0 = bot, 1 = human).
    'recaptcha_min_score' => 0.5,
];
