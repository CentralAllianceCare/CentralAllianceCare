# Deploy to Vercel + Supabase (FREE)

## 🎯 Overview

```
✅ Frontend: Vercel (FREE tier)
✅ Database: Supabase PostgreSQL (FREE tier - 12GB included)
✅ Cost: $0/month during development
✅ Auto-deploys from GitHub on every push
```

**Timeline: 20-30 minutes**

---

## Step 1: Create Supabase Account (5 min)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (easiest option)
4. Create new project:
   - Name: `central-alliance-care`
   - Database password: (generate strong password, save it)
   - Region: `Sydney` (or closest to you)
5. Wait for database to initialize (~2-3 min)

---

## Step 2: Get Supabase Connection String (5 min)

1. In Supabase dashboard, go to **Settings → Database**
2. Copy connection string:
   - Look for "PostgreSQL Connection String"
   - Click "Copy"
   - Paste it somewhere safe

3. **Important:** Replace `[YOUR-PASSWORD]` with the password you created
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

---

## Step 3: Update Project Code (5 min)

**Edit `prisma/schema.prisma`:**

Change the datasource from:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

To:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Save file.**

---

## Step 4: Create `.env.production` File (2 min)

Create file: `C:\Users\joena\.openclaw\workspace\CentralAllianceCare\.env.production`

```env
# Supabase PostgreSQL Connection
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"

# NextAuth Configuration
NEXTAUTH_SECRET="your-production-secret-key-change-this"
NEXTAUTH_URL="https://centralalliancecare.com.au"

# For local testing with Supabase (if needed)
# DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"
```

**Important:** Replace `[YOUR-PASSWORD]` and the Supabase URL with your actual values.

---

## Step 5: Push Schema to Supabase (5 min)

Run migrations to create tables in PostgreSQL:

```bash
cd C:\Users\joena\.openclaw\workspace\CentralAllianceCare

# Ensure .env has correct DATABASE_URL
# Generate Prisma client
npx prisma generate

# Run migrations to Supabase
npx prisma migrate deploy
```

This will:
- Read your `.env.production` DATABASE_URL
- Connect to Supabase PostgreSQL
- Create User, Profile, Message tables

If you get errors, check:
- Password is correct (no special characters escaped wrong)
- Firewall allows your IP (Supabase allows all by default)
- Database initialized (wait another minute if just created)

---

## Step 6: Generate NextAuth Secret (2 min)

Generate a secure secret for production:

```bash
# Generate 32-character random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy output and update `.env.production`:
```env
NEXTAUTH_SECRET="[paste-output-here]"
```

---

## Step 7: Commit Code to GitHub (2 min)

```bash
cd C:\Users\joena\.openclaw\workspace\CentralAllianceCare

git add prisma/schema.prisma
git add .env.production
git commit -m "feat: prepare for production deployment (Vercel + Supabase)"
git push origin main
```

---

## Step 8: Create Vercel Account (3 min)

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access GitHub

---

## Step 9: Import Project to Vercel (5 min)

1. After signing in to Vercel, click "Add New..." → "Project"
2. Find and select `CentralAllianceCare` repository
3. Click "Import"
4. **Configure Environment Variables:**
   - Scroll down to "Environment Variables"
   - Add these variables:
     ```
     DATABASE_URL = postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
     NEXTAUTH_SECRET = [your-generated-secret]
     NEXTAUTH_URL = https://centralalliancecare.com.au
     ```
   - Click "Deploy"

Vercel will:
- Build Next.js app
- Create live URL (e.g., `centralalliancecare.vercel.app`)
- Auto-deploy on every GitHub push

---

## Step 10: Connect Custom Domain (5 min)

1. In Vercel project settings, go to **Domains**
2. Add domain: `centralalliancecare.com.au`
3. Vercel gives you nameservers
4. Go to your domain registrar (where you bought the domain)
5. Update nameservers to point to Vercel
6. Wait 5-30 min for DNS to propagate

**Done!** Your app is now live at `https://centralalliancecare.com.au`

---

## ✅ Verification

After deployment:

```bash
# Test the live site
curl https://centralalliancecare.com.au
# Should return HTML (not 404)

# Test API is working
curl https://centralalliancecare.com.au/api/users
# Should return JSON response
```

Try registering an account on the live site!

---

## 🔄 Auto-Deployment

Now when you:
```bash
git push origin main
```

Vercel automatically:
1. Pulls latest code
2. Builds Next.js
3. Deploys to production
4. Updates centralalliancecare.com.au

**No manual deployment needed!**

---

## 📊 What You Get (Free Tier)

**Supabase:**
- PostgreSQL database (12 GB)
- Real-time capabilities
- 50 MB file storage
- User authentication (extra)
- Enough for 100K+ users in development

**Vercel:**
- Serverless functions (1M invocations/month)
- 100 GB bandwidth
- Global CDN
- SSL/TLS included
- Enough for 1M+ requests/month

---

## 🆘 Troubleshooting

### "Connection refused"
- Check Supabase password is correct
- Verify DATABASE_URL in .env matches exactly
- Wait for Supabase database to fully initialize

### "Vercel build fails"
- Check logs in Vercel dashboard (Deployments → Failed → Logs)
- Ensure all env vars are set
- Run `npm run build` locally to test

### "Site not loading"
- Check DNS propagation (5-30 min after nameserver change)
- Verify domain in Vercel Domains tab is green/ready
- Clear browser cache (Ctrl+Shift+Delete)

### "NextAuth not working"
- Verify NEXTAUTH_URL matches your domain exactly
- Check NEXTAUTH_SECRET is set (not empty)
- Cookies require HTTPS (Vercel auto-provides)

---

## 📝 Next Steps After Deployment

1. ✅ Live site is running
2. Test registration/login on production
3. Complete testing checklist (TESTING_CHECKLIST.md)
4. Monitor Vercel dashboard for errors
5. Continue building Week 2 features (search, documents, verification)

---

## 🚀 You're Done!

**Your site is now LIVE and ready to use.**

Every time you:
- Add new features
- Fix bugs
- Update the database schema

Just push to GitHub and Vercel auto-deploys!

---

**Estimated total time: 20-30 minutes**  
**Total cost: $0** ✅

Need help? Check Vercel/Supabase docs or let me know!
