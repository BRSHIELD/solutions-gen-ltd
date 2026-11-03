# Deploying to cPanel (solutionsgen.co.ke)

The live site is a static build served by cPanel, with `contact.php` emailing
form submissions to info@solutionsgen.co.ke. No Node.js or Python app runs on
the server.

## Build and upload

1. `corepack pnpm build:static` produces `dist/public`.
2. Package it as **tar.gz** (the host's virus scanner rejects zips that contain
   JavaScript files):
   `cd dist/public && tar --exclude=.DS_Store -czf ../solutionsgen-site.tar.gz .`
3. In cPanel File Manager, upload the tar.gz into `public_html` and click
   Extract. Existing files are overwritten in place. Delete the archive after.

## reCAPTCHA (optional but recommended)

1. Create a **reCAPTCHA v3** key pair at https://www.google.com/recaptcha/admin
   for the domains `solutionsgen.co.ke` and `www.solutionsgen.co.ke`.
2. Put the **site key** in `.env.production` as `VITE_RECAPTCHA_SITE_KEY` and
   rebuild.
3. On the server, copy `contact-config.example.php` to
   `/home/<cpanel-user>/contact-config.php` (one level above `public_html`)
   and paste the **secret key** into it.

Until both halves are in place the form works without reCAPTCHA; the honeypot
field and rate limit still apply.
