# Authentication in this repository

This is a Next.js server application with NextAuth v4 Credentials authentication and Prisma/PostgreSQL. Supabase appears in deployment instructions as a database host; the code does not use Supabase Auth. GitHub Pages alone cannot run its API handlers or database authentication.

## Components and request flow

1. `/register` now presents an app screenshot walkthrough. It collects no credentials and sends no signup requests. The existing `/api/auth/register` endpoint remains available to callers; replacing the page does not disable the API.
2. `src/app/api/auth/register/route.ts` checks required fields and duplicate email, hashes the password with bcrypt cost 12, and creates User and Profile records. The response contains ID, email and role, not the hash. Registration does not create a session.
3. `src/app/login/page.tsx` calls `signIn('credentials', { email, password, redirect: false })`, then navigates to `/dashboard` on success. The displayed role selector is not passed to authentication.
4. `src/app/api/auth/[...nextauth]/route.ts` exports NextAuth as GET and POST. It delegates authentication to `src/lib/auth.ts`, which looks up the email with Prisma and compares the supplied password with the saved bcrypt hash. Missing or invalid credentials return null.
5. `src/lib/auth.ts` uses JWT sessions. Its JWT callback copies the database user ID and role to token claims on login. Its session callback exposes those claims on `session.user`.
6. `src/app/providers.tsx` wraps the application in SessionProvider. Dashboard components use `useSession` for client state and redirects. API handlers independently call `getServerSession(authOptions)`; a client redirect is not API authorization.
7. For example, `src/app/api/messages/route.ts` resolves the current database user from the authenticated session email and limits reads to messages between that user and the selected recipient. `src/app/api/users/route.ts` permits any authenticated session to list user names, emails and roles.

## Credentials and tokens

Passwords pass from browser to server and are compared/hashed server-side; deployment must use HTTPS. `prisma/schema.prisma` stores the bcrypt hash in User.password. DATABASE_URL contains database connection credentials and is server configuration. NEXTAUTH_SECRET is the server-side token secret; NEXTAUTH_URL identifies the deployment origin. Keep these in ignored environment files or the host's environment settings.

No custom localStorage token persistence, bearer access-token API, refresh-token rotation or OAuth provider appears in this implementation. NextAuth manages the JWT session cookie with its library defaults; cookie attributes, lifetime and token encoding are not overridden here. The browser session exposes ID/role, not the password hash or NEXTAUTH_SECRET. Role claims are copied on login and are not refreshed from the database by the JWT callback on subsequent requests.

## Gaps observed in code and docs

- auth.ts falls back to the public literal `fallback-secret-for-development` when NEXTAUTH_SECRET is absent. Set a unique secret before production; the current code does not fail closed.
- Registration accepts a caller-supplied role without a server allowlist, including potential `admin` values. Restrict public signup roles server-side before relying on roles for privileges.
- The server registration handler does not enforce a minimum password length, normalize emails or validate input types robustly.
- No application rate limiting, MFA, email verification or working password-reset endpoint was found. The login reset link points to `#`.
- DEPLOY_VERCEL_SUPABASE.md tells users to stage `.env.production`. Do not commit credentials. Its statement that Prisma migrations automatically read `.env.production` also requires correction or explicit environment loading.
- The Prisma schema already uses PostgreSQL, despite deployment instructions describing a switch from SQLite. Deployment docs describe intended setup, not proof of the live domain's host.

The homepage links to `/login` and the screenshot preview at `/register`. The preview replaces the signup form; server authentication and registration handlers are unchanged.
