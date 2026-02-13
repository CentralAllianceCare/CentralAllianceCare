'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'worker' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: form.role }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Registration failed')
      setLoading(false)
      return
    }

    router.push('/login?registered=true')
  }

  const roles = [
    { id: 'provider', label: 'Business Provider', desc: 'Healthcare facility or service', icon: 'HCP' },
    { id: 'worker', label: 'Healthcare Worker', desc: 'AIN, EN, RN, Coordinator, etc.', icon: 'HCW' },
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
          <h1 className="text-[#C8A951] text-3xl font-bold mb-4">Join Central Alliance Care</h1>
          <p className="text-white/70 text-lg leading-relaxed">Create your account and connect with Australia&apos;s NDIS &amp; Aged Care community.</p>
        </div>
        <div className="relative z-10 mt-12 space-y-5 px-12 max-w-md w-full">
          {[
            { icon: 'PROF', text: 'Build your professional profile' },
            { icon: 'CONN', text: 'Connect with providers and workers' },
            { icon: 'DOCS', text: 'Manage compliance documents easily' },
            { icon: 'JOBS', text: 'Find opportunities or find staff' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4 text-white/80">
              <span className="w-11 h-11 rounded-full border border-[#C8A951]/30 flex items-center justify-center text-xs font-semibold shrink-0">{f.icon}</span>
              <span className="text-sm">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">Create Account</h2>
          <p className="text-gray-500 mb-8">Get started in under a minute</p>

          {/* Role Selection */}
          <div className="flex gap-3 mb-8">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => update('role', r.id)}
                className={`flex-1 py-4 px-3 rounded-xl border-2 text-center transition-all ${
                  form.role === r.id
                    ? 'border-[#00563F] bg-[#00563F] text-white'
                    : 'border-gray-200 bg-white hover:border-[#00563F]'
                }`}
              >
                <span className={`block text-xs font-bold mb-1 px-2 py-1 rounded ${
                  form.role === r.id ? 'bg-white text-[#00563F]' : 'bg-[#00563F] text-white'
                }`}>{r.icon}</span>
                <span className="text-sm font-semibold block">{r.label}</span>
                <span className={`text-xs block mt-1 ${form.role === r.id ? 'text-white/70' : 'text-gray-400'}`}>{r.desc}</span>
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Your full name"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="Minimum 8 characters"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                placeholder="Repeat your password"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#00563F] text-white rounded-xl font-semibold text-lg hover:bg-[#C8A951] transition disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-[#00563F] font-semibold hover:text-[#C8A951] transition">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
