# Deployment Checklist - Vercel + Supabase

**Total time: 30 minutes | Cost: $0**

Follow these steps in order. Check them off as you go.

---

## ☐ Part 1: Supabase Setup (10 min)

- [ ] Go to https://supabase.com
- [ ] Sign up (GitHub login easiest)
- [ ] Create new project:
  - Name: `central-alliance-care`
  - Database password: _(save this!)_
  - Region: Sydney
- [ ] Wait for database to initialize (2-3 min)
- [ ] In Supabase dashboard → Settings → Database
- [ ] Copy PostgreSQL connection string
- [ ] Save it: `postgresql://postgres:[PASSWORD]@db.XXXXX.supabase.co:5432/postgres`

**Verify:** Can you see the database in Supabase dashboard? ✓

---

## ☐ Part 2: Create Production Files (5 min)

**Create `.env.production` file** in project root:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.XXXXX.supabase.co:5432/postgres"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="https://centralalliancecare.com.au"
```

Copy-paste from template:
```bash
# In project directory
cp .env.production.example .env.production

# Then edit .env.production with your actual values
```

**Steps:**
1. Open `.env.production.example`
2. Copy all content
3. Create new file `.env.production`
4. Paste content
5. Replace placeholders:
   - `[YOUR-PASSWORD]` with your Supabase password
   - `[PROJECT_ID]` with your Supabase project ID (from connection string)
   - NEXTAUTH_SECRET with random string

**Generate NEXTAUTH_SECRET:**
```bash
# Run this in PowerShell
$randomString = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
Write-Output $randomString
```

Copy output and paste into NEXTAUTH_SECRET

**Verify:** .env.production file exists with all values filled in? ✓

---

## ☐ Part 3: Update Prisma Schema (2 min)

**Edit `prisma/schema.prisma`:**

Find this section:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Change to:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Save file.

**Verify:** File saved? ✓

---

## ☐ Part 4: Deploy to Supabase (5 min)

Run this command:

```bash
cd C:\Users\joena\.openclaw\workspace\CentralAllianceCare

# Load production environment
$env:DATABASE_URL = (Get-Content .env.production | Select-String "DATABASE_URL" | % {$_ -replace "DATABASE_URL=", ""}).ToString().Trim('"')

# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma migrate deploy
```

Or simpler (if above doesn't work):
```bash
# Manually set env var
$env:DATABASE_URL = "postgresql://postgres:YOUR_PASSWORD@db.XXXXX.supabase.co:5432/postgres"

# Run migrations
npx prisma generate
npx prisma migrate deploy
```

**What this does:**
- Connects to your Supabase database
- Creates User, Profile, Message tables
- Sets up relationships

**Verify:** Check Supabase dashboard → Tables
- Do you see `User`, `Profile`, `Message` tables? ✓
- Do they have columns? ✓

If error, check:
- [ ] Password is correct (no escaped special chars)
- [ ] Supabase URL is correct
- [ ] Database fully initialized (wait 1 min if just created)
- [ ] Internet connection working

---

## ☐ Part 5: Commit Code (2 min)

```bash
cd C:\Users\joena\.openclaw\workspace\CentralAllianceCare

git add prisma/schema.prisma
git add .env.production
git add .env.production.example

git commit -m "feat: prepare for production deployment (Vercel + Supabase)"

git push origin main
```

**Verify:** Code pushed to GitHub? ✓

---

## ☐ Part 6: Vercel Setup (5 min)

- [ ] Go to https://vercel.com
- [ ] Click "Sign Up"
- [ ] Choose "Continue with GitHub"
- [ ] Authorize Vercel

**Verify:** Logged into Vercel? ✓

---

## ☐ Part 7: Import Project to Vercel (5 min)

- [ ] In Vercel dashboard, click "Add New..." → "Project"
- [ ] Search for `CentralAllianceCare` repo
- [ ] Click "Import"
- [ ] Scroll to "Environment Variables"
- [ ] Add these variables:
  ```
  DATABASE_URL = postgresql://postgres:[PASSWORD]@db.XXXXX.supabase.co:5432/postgres
  NEXTAUTH_SECRET = [your-generated-secret]
  NEXTAUTH_URL = https://centralalliancecare.com.au
  ```
- [ ] Click "Deploy"

Vercel will start building. Wait ~2-3 min for deployment.

**Verify:** 
- [ ] Deployment finished (page shows ✓ or green checkmark)
- [ ] Vercel gives you a URL like `https://projectname.vercel.app`
- [ ] Click that URL - does the site load? ✓

---

## ☐ Part 8: Connect Custom Domain (5 min)

- [ ] In Vercel project, go to Settings → Domains
- [ ] Add domain: `centralalliancecare.com.au`
- [ ] Vercel shows nameserver instructions
- [ ] Go to where you bought the domain (registrar)
- [ ] Update nameservers to Vercel's ones
- [ ] Wait 5-30 min for DNS to propagate

**Verify:**
- [ ] Vercel shows domain as "Valid" (green checkmark)
- [ ] Can you visit https://centralalliancecare.com.au? ✓
- [ ] Loads without "Domain not found" error? ✓

---

## ☐ Part 9: Test Live Site (3 min)

1. Go to https://centralalliancecare.com.au
2. Click "Register"
3. Create test account:
   - Name: Test Worker
   - Email: test@example.com
   - Password: TestPassword123!
   - Role: Worker
4. Click "Register"
5. Try to log in with same credentials
6. Go to Dashboard
7. Complete profile

**Verify:**
- [ ] Registration works? ✓
- [ ] Login works? ✓
- [ ] Dashboard loads? ✓
- [ ] Profile editor works? ✓

---

## ✅ DONE!

Your site is now **LIVE** at https://centralalliancecare.com.au

**What happens next:**
- Every time you `git push origin main`, Vercel auto-deploys
- No manual deployment needed
- Production database is PostgreSQL on Supabase
- Local dev still uses SQLite (for fast iteration)

---

## 🚀 Continue Development

Now that site is live:

1. **Week 2 APIs:**
   - Search endpoints (`/api/users/search`)
   - Document upload (`/api/documents/upload`)
   - Verification system (`/api/admin/verifications`)

2. **Each time you commit:**
   ```bash
   git push origin main
   # Vercel auto-deploys within 30 seconds
   ```

3. **Monitor:** https://vercel.com/dashboard
   - See deployment logs
   - Check for errors
   - View analytics

---

## 🆘 If Something Goes Wrong

**Deployment failed in Vercel?**
- Click the failed deployment
- Check "Logs" tab
- Common issues:
  - Missing env var (check Environment Variables section)
  - Database connection error (check DATABASE_URL spelling)
  - Build error (check Terminal output)

**Site won't load?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check if deployment finished (green checkmark)
- Wait for DNS (can take 30 min)
- Check Vercel status page

**Database error?**
- Check Supabase dashboard → Health
- Verify password in DATABASE_URL
- Make sure migrations ran successfully

Need help? Let me know which step failed!

---

**Estimated time: 30 min | Total cost: $0 ✓**
