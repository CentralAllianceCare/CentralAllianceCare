'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('worker')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const roles = [
    { id: 'provider', label: 'Provider', icon: '🏥' },
    { id: 'worker', label: 'Worker', icon: '👩‍⚕️' },
    { id: 'admin', label: 'Admin', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-center items-center relative overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #00563F 50%, #1a1a2e 100%)' }}>
        <Link href="/" className="absolute top-8 left-8 text-white/60 hover:text-[#C8A951] transition text-sm flex items-center gap-2">
          ← Back to Home
        </Link>
        <div className="relative z-10 text-center px-12 max-w-md">
          <h1 className="text-[#C8A951] text-3xl font-bold mb-4">Central Alliance Care</h1>
          <p className="text-white/70 text-lg leading-relaxed">Your trusted partner in NDIS &amp; Aged Care staffing across Australia.</p>
        </div>
        <div className="relative z-10 mt-12 space-y-5 px-12 max-w-md w-full">
          {[
            { icon: '👥', text: 'Access hundreds of qualified healthcare professionals' },
            { icon: '📅', text: 'Manage bookings and availability in real-time' },
            { icon: '🛡️', text: 'Compliance tracking and document management' },
            { icon: '📹', text: 'Video interviews and live reference checks' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4 text-white/80">
              <span className="w-11 h-11 rounded-full border border-[#C8A951]/30 flex items-center justify-center text-lg shrink-0">{f.icon}</span>
              <span className="text-sm">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

          {/* Role Tabs */}
          <div className="flex gap-3 mb-8">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex-1 py-4 rounded-xl border-2 text-center transition-all ${
                  role === r.id
                    ? 'border-[#00563F] bg-[#00563F] text-white'
                    : 'border-gray-200 bg-white hover:border-[#00563F]'
                }`}
              >
                <span className="block text-2xl mb-1">{r.icon}</span>
                <span className="text-sm font-semibold">{r.label}</span>
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
              />
            </div>

            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="#" className="text-[#00563F] font-medium hover:text-[#C8A951] transition">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#00563F] text-white rounded-xl font-semibold text-lg hover:bg-[#C8A951] transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#00563F] font-semibold hover:text-[#C8A951] transition">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
