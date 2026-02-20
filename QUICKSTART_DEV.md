# Quick Start — Local Development

## 🚀 Server Status

**Dev server is currently RUNNING on http://localhost:3000**

If you need to restart:
```bash
# Kill existing process
# Ctrl+C in the terminal running "npm run dev"

# Navigate to project
cd C:\Users\joena\.openclaw\workspace\CentralAllianceCare

# Start dev server
npm run dev
```

Server will be available at:
- Local: http://localhost:3000
- Network: http://192.168.1.2:3000

---

## 📱 Try It Out

### 1. Register a Worker Account
1. Go to http://localhost:3000
2. Click "Register"
3. Fill in:
   - Name: Your Name
   - Email: yourname@example.com
   - Password: SecurePassword123!
   - Role: Worker
4. Click "Register"

### 2. Log In
1. Click "Login"
2. Use email/password from registration
3. Click "Sign In"

### 3. Complete Your Profile
1. Click "Dashboard" (top nav)
2. Click "Profile" (sidebar)
3. Fill in worker details:
   - Qualifications (e.g., "RN, BN")
   - Experience (e.g., "5 years aged care")
   - Expected Salary
   - Transport (car, public transit, etc.)
   - License Type (if applicable)
   - NDIS Registration status
   - First Aid Expiry Date
   - Vaccination Date
4. Click "Save"

### 4. Send a Message
1. Go to "Messages" (sidebar)
2. You'll see a conversation list
3. Click on a user to open chat
4. Type a message
5. Click "Send"

---

## 🔧 Development Commands

```bash
# Start dev server (main terminal)
npm run dev

# Open database GUI (new terminal)
npx prisma studio
# Opens http://localhost:5555

# Run tests
node test-flow.js

# Build for production
npm run build

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

---

## 📁 Key Files to Know

```
CentralAllianceCare/
├── src/
│   ├── app/
│   │   ├── api/              ← All API endpoints
│   │   │   ├── auth/         ← Login/register
│   │   │   ├── profile/      ← Profile endpoints
│   │   │   ├── messages/     ← Messaging API
│   │   │   └── users/        ← User endpoints
│   │   ├── login/            ← Login page
│   │   ├── register/         ← Register page
│   │   ├── dashboard/        ← Protected routes
│   │   │   ├── profile/      ← Profile editor
│   │   │   └── messages/     ← Messages UI
│   │   └── layout.tsx        ← Main layout
│   ├── lib/
│   │   ├── auth.ts           ← NextAuth config
│   │   └── prisma.ts         ← DB client
│   └── (styles)
├── prisma/
│   ├── schema.prisma         ← Database schema
│   ├── migrations/           ← Migration history
│   └── dev.db                ← SQLite database
├── package.json              ← Dependencies
├── .env.local                ← Environment variables
├── DEVELOPMENT.md            ← Full status & roadmap
└── test-flow.js              ← API test suite
```

---

## 🐛 Common Issues

### "Database not found"
```bash
# Regenerate Prisma client
npx prisma generate

# Check .env.local exists and has:
# DATABASE_URL="file:./prisma/dev.db"
```

### "Port 3000 already in use"
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID)
taskkill /PID <PID> /F

# Or use different port
next dev -p 3001
```

### "NextAuth secret not set"
```bash
# Check .env.local has:
# NEXTAUTH_SECRET="your-secret-here"
# NEXTAUTH_URL="http://localhost:3000"
```

---

## 📊 Architecture Overview

```
User (Browser)
    ↓ HTTP/HTTPS
Next.js Server (http://localhost:3000)
    ↓ NextAuth Session
Protected Routes
    ↓ Prisma ORM
SQLite Database (prisma/dev.db)
```

**Request Flow Example (Login):**
1. User submits email/password on `/login`
2. `signIn()` calls `/api/auth/[...nextauth]`
3. NextAuth provider checks credentials against database
4. If valid: Creates JWT token, sets secure cookie
5. User redirected to `/dashboard`
6. All subsequent requests include session cookie
7. Protected routes verify session before responding

---

## 🎯 Next Steps

**Today (if continuing):**
- [ ] Register test accounts (worker + provider)
- [ ] Test profile completion
- [ ] Test messaging between accounts
- [ ] Verify all forms work

**This week:**
- [ ] Build search endpoints (`/api/users/search`)
- [ ] Build document upload (`/api/documents/upload`)
- [ ] Build verification system (`/api/admin/verifications`)

**Next week:**
- [ ] Frontend polish (error messages, loading states)
- [ ] Mobile responsiveness
- [ ] Performance optimization

---

## 💬 Questions?

Check:
1. `DEVELOPMENT.md` — Full status & architecture
2. `package.json` — All dependencies
3. `prisma/schema.prisma` — Database structure
4. `src/lib/auth.ts` — Authentication config

---

**Server Status:** 🟢 Running  
**Database:** 🟢 Ready  
**Ready to develop!** 🚀
