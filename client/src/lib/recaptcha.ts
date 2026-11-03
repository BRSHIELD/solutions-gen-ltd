// Google reCAPTCHA v3 (invisible) for the static/cPanel deployment.
// Enabled only when the site is built standalone AND a site key is set
// (VITE_RECAPTCHA_SITE_KEY in .env.production). The matching secret key
// lives on the server in contact-config.php, outside public_html.

export const RECAPTCHA_SITE_KEY: string =
  (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined)?.trim() ?? "";
export const RECAPTCHA_ENABLED = Boolean(import.meta.env.VITE_STANDALONE && RECAPTCHA_SITE_KEY);

declare global {
  interface Window {
    grecaptcha?: {
      ready(cb: () => void): void;
      execute(siteKey: string, opts: { action: string }): Promise<string>;
    };
  }
}

const SCRIPT_ID = "recaptcha-script";

export function loadRecaptcha(): void {
  if (!RECAPTCHA_ENABLED || document.getElementById(SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

/** Resolves with a token for the given action, or "" when reCAPTCHA is off. */
export function getRecaptchaToken(action = "contact"): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!RECAPTCHA_ENABLED) {
      resolve("");
      return;
    }
    loadRecaptcha();
    const started = Date.now();
    const tick = () => {
      const g = window.grecaptcha;
      if (g) {
        g.ready(() => g.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve, reject));
        return;
      }
      if (Date.now() - started > 10000) {
        reject(new Error("reCAPTCHA failed to load"));
        return;
      }
      setTimeout(tick, 100);
    };
    tick();
  });
}
