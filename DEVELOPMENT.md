# Central Alliance Care — Development Status

## 🚀 Current Status (Feb 20, 2026)

**Server:** ✅ Running on http://localhost:3000  
**Database:** ✅ SQLite (dev.db, fully migrated)  
**Auth System:** ✅ NextAuth + JWT working  
**API Tests:** ✅ All passing (registration, validation, role separation)

---

## 📋 Week 1 Completion (Backend Foundation)

### ✅ Core APIs Implemented

**Authentication (`/api/auth`)**
- `POST /auth/register` — Create new user (worker/provider/admin)
- NextAuth credentials provider with bcrypt hashing
- Email validation & duplicate prevention
- Profile auto-creation on signup

**User Management (`/api/users`)**
- User role support (worker, provider, admin)
- Session-based authorization
- User lookup endpoints

**Profiles (`/api/profile`)**
- `GET /profile` — Fetch user's profile
- `POST /profile` — Create/update profile (upsert)
- Worker-specific fields (qualifications, experience, NDIS status, first aid expiry)
- Provider-specific fields (business name, ABN, services offered)
- Common fields (bio, avatar, location)

**Messaging (`/api/messages`)**
- `GET /messages?userId=X` — Fetch conversation with user
- `POST /messages` — Send message
- `GET /messages/conversations` — List all conversations
- `POST /messages/read` — Mark message as read
- Full message threading support

### 🎨 Frontend Pages Built

| Page | Status | Features |
|------|--------|----------|
| `/` | ✅ Complete | Landing page, role selection |
| `/login` | ✅ Complete | Email/password login with role selector |
| `/register` | ✅ Complete | User registration form |
| `/dashboard` | ✅ Complete | Main authenticated area |
| `/dashboard/profile` | ✅ Complete | Profile editor (worker/provider details) |
| `/dashboard/messages` | ✅ Complete | Messaging interface |
| `/dashboard/video` | 🔧 Built | Video call page (UI ready, Agora.io integration pending) |

### 🗄️ Database Schema

```prisma
User
├── id, email, name, password (hashed)
├── role: "worker" | "provider" | "admin"
├── phone, createdAt, updatedAt
└── Relations: Profile, Messages (sent/received)

Profile
├── userId (unique, 1:1 with User)
├── Worker fields: qualifications, experience, transport, NDIS status, certifications
├── Provider fields: businessName, ABN, servicesOffered, businessType
└── Common: bio, avatar, location, dates

Message
├── id, content, createdAt, read
├── senderId, receiverId (foreign keys to User)
└── Full message threading support
```

---

## 📝 What's Left (Weeks 2-4)

### Week 2: Advanced APIs (Document Upload, Search, Verification)

```typescript
// Document Upload - TODO
POST /api/documents/upload
- Handle file upload (PDF, images)
- Store in database or cloud storage
- Link to user profile

// Search Users - TODO
GET /api/users/search?role=provider&location=Sydney&qualifications=RN
- Search workers by qualifications
- Search providers by services & location
- Filter by role

// Verification System - TODO
POST /api/verification/request
- Request identity/qualification verification
- Admin dashboard to approve/reject
- Track verification status

// Admin Dashboard - TODO
GET /api/admin/users - list all users
GET /api/admin/verifications - pending verifications
POST /api/admin/approvals - approve documents
```

### Week 3: Frontend Polish & Integration

- [ ] Form validation improvements
- [ ] Error handling UI
- [ ] Loading states on all pages
- [ ] Document upload UI component
- [ ] Search interface for finding providers
- [ ] Verification status display
- [ ] Mobile responsiveness

### Week 4: Deployment & Testing

- [ ] Environment setup (DigitalOcean backend, Netlify frontend)
- [ ] Production database (PostgreSQL)
- [ ] API testing suite
- [ ] Security hardening
- [ ] Performance optimization
- [ ] Go-live checklist

---

## 🧪 Testing the System

### Manual Testing (Browser)

```bash
1. Open http://localhost:3000
2. Click "Register"
3. Fill form with:
   - Name: Test Worker
   - Email: testworker@example.com
   - Password: SecurePassword123!
   - Role: Worker
4. Click "Register"
5. Log in with same email/password
6. Complete profile
7. Return to dashboard
8. Go to Messages
9. Search for another user
10. Send a test message
```

### Automated Testing

```bash
npm run test-api
# (test-flow.js already verified registration & validation)
```

---

## 🔧 Development Workflow

**Local Development:**
```bash
# Terminal 1: Start dev server
npm run dev
# Runs on http://localhost:3000

# Terminal 2: Optional - Watch database changes
npx prisma studio
# Opens http://localhost:5555 (database GUI)
```

**Git Workflow:**
```bash
git status
git add .
git commit -m "feat: [what changed]"
git push origin main
```

**Database Migrations:**
```bash
# After schema changes in prisma/schema.prisma
npx prisma migrate dev --name [description]
# Tests migration & applies to dev.db
```

---

## 📊 Tech Stack Summary

- **Framework:** Next.js 16 (React 19, TypeScript)
- **Database:** Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Auth:** NextAuth.js v4 + JWT + bcryptjs
- **Styling:** Tailwind CSS v4
- **Deployment:** Netlify (frontend) + DigitalOcean (backend)
- **Forms:** React hooks (useState)
- **HTTP:** Fetch API (no external HTTP client needed)

---

## 🚨 Known Issues

1. **Duplicate lockfile warning** — Multiple package-lock.json files detected
   - Fix: Clean up root-level package.json if not needed
   - Current impact: None, just warning

2. **Video page UI only** — Agora.io integration not implemented yet
   - Fix: Add to Week 2-3 if needed

3. **Search endpoints not yet implemented**
   - Blocking: User discovery feature
   - Fix: Add `/api/users/search` endpoint

---

## 📌 Next Actions

**Immediate (This session):**
1. ✅ Get server running locally
2. ✅ Verify auth system works
3. ✅ Test API endpoints
4. ⬜ Commit to GitHub

**This week:**
1. Build search endpoints
2. Build document upload
3. Build admin verification system
4. Create verification UI

**Next week:**
1. Frontend polish
2. Error handling
3. Performance optimization

---

## 💡 Quick Reference

**Important Files:**
- `src/app/api/` — All API routes
- `src/app/` — Frontend pages
- `prisma/schema.prisma` — Database schema
- `src/lib/auth.ts` — NextAuth configuration
- `.env.local` — Environment variables (DO NOT COMMIT)

**Development Commands:**
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code style
npx prisma studio   # Open database GUI
```

**Deployment (Future):**
```bash
# DigitalOcean setup
npm run build
npm start

# Netlify deployment
git push origin main
# Auto-deploys via Netlify
```

---

**Last Updated:** Feb 20, 2026 11:53 AM  
**Status:** 🟢 Week 1 Complete • 🚀 Ready for Week 2 Development
