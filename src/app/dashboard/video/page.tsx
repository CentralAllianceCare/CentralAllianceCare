'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function VideoCallPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showComingSoon, setShowComingSoon] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) return null

  const user = session.user as any

  const features = [
    {
      icon: '🎥',
      title: 'HD Video Calls',
      description: 'Crystal clear video quality for professional interviews and consultations'
    },
    {
      icon: '📱',
      title: 'Multi-Device Support',
      description: 'Join calls from desktop, tablet, or mobile devices'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'End-to-end encrypted calls with HIPAA compliance'
    },
    {
      icon: '📝',
      title: 'Call Recording',
      description: 'Record interviews and reference calls for quality assurance'
    },
    {
      icon: '👥',
      title: 'Group Calls',
      description: 'Multi-participant calls for team meetings and training'
    },
    {
      icon: '📅',
      title: 'Scheduled Calls',
      description: 'Book video interviews directly through the platform'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-[#1a1a2e] text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[#C8A951] font-bold text-xl">Central Alliance Care</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hover:text-[#C8A951] transition">Dashboard</Link>
              <Link href="/dashboard/profile" className="hover:text-[#C8A951] transition">Profile</Link>
              <Link href="/dashboard/messages" className="hover:text-[#C8A951] transition">Messages</Link>
              <Link href="/dashboard/video" className="text-[#C8A951] font-medium">Video Call</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-[#00563F] px-3 py-1 rounded-full text-xs font-medium capitalize">{user.role}</span>
            <span className="text-white/70 text-sm">{user.name || user.email}</span>
            <button
              onClick={() => router.push('/api/auth/signout')}
              className="bg-white/10 hover:bg-[#C8A951] px-4 py-2 rounded-lg text-sm transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-4">Video Calls</h1>
          <p className="text-gray-500 text-lg">
            {user.role === 'provider' 
              ? 'Conduct video interviews with healthcare workers and check references live.'
              : 'Join video interviews with providers and showcase your skills in real-time.'}
          </p>
        </div>

        {/* Main Video Interface */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#00563F] rounded-t-2xl relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-5xl">🎥</div>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Ready for Video Calls</h3>
                <p className="text-white/80 mb-6">Connect face-to-face with healthcare professionals</p>
                <button
                  onClick={() => setShowComingSoon(true)}
                  className="bg-[#C8A951] text-[#1a1a2e] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white transition inline-flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Start Video Call
                </button>
              </div>
            </div>
          </div>
          
          {/* Call Controls */}
          <div className="p-6">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setShowComingSoon(true)}
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
                title="Microphone"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button
                onClick={() => setShowComingSoon(true)}
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
                title="Camera"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => setShowComingSoon(true)}
                className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition"
                title="End Call"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 3l1.5 1.5m0 0l2 2L10 9l3 3M3 3l1.5 1.5M3 3l18 18" />
                </svg>
              </button>
              <button
                onClick={() => setShowComingSoon(true)}
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
                title="Screen Share"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => setShowComingSoon(true)}
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition"
                title="Settings"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-[#1a1a2e] text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-[#1a1a2e] text-lg mb-4">
              {user.role === 'provider' ? 'Schedule Interview' : 'Join Scheduled Call'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {user.role === 'provider' 
                ? 'Book video interviews with potential healthcare workers.'
                : 'Join your scheduled video interviews with providers.'}
            </p>
            <button
              onClick={() => setShowComingSoon(true)}
              className="bg-[#00563F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C8A951] transition"
            >
              {user.role === 'provider' ? 'Schedule Interview' : 'View Scheduled Calls'}
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-[#1a1a2e] text-lg mb-4">
              {user.role === 'provider' ? 'Reference Check Calls' : 'Reference Availability'}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {user.role === 'provider' 
                ? 'Conduct live video calls with worker references.'
                : 'Manage when your references are available for video calls.'}
            </p>
            <button
              onClick={() => setShowComingSoon(true)}
              className="border-2 border-[#00563F] text-[#00563F] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00563F] hover:text-white transition"
            >
              {user.role === 'provider' ? 'Check References' : 'Setup Reference Calls'}
            </button>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4">Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                Video calling functionality is currently in development. We're building a comprehensive video platform 
                with features like HD calls, screen sharing, and interview recording.
              </p>
              <div className="space-y-2 text-left bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 font-medium">🎯 Planned Features:</p>
                <ul className="text-xs text-gray-500 space-y-1 ml-4">
                  <li>• Daily.co integration for reliable video calls</li>
                  <li>• Scheduled interviews with calendar sync</li>
                  <li>• Live reference check calls</li>
                  <li>• Call recording and playback</li>
                  <li>• Mobile app support</li>
                </ul>
              </div>
              <button
                onClick={() => setShowComingSoon(false)}
                className="bg-[#00563F] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#C8A951] transition"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}