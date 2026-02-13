'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    profileCompletion: 20,
    messages: 0,
    upcoming: 0
  })

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (session) loadDashboardData()
  }, [status, session, router])

  const loadDashboardData = async () => {
    try {
      // Load conversations to get message count
      const messagesRes = await fetch('/api/messages/conversations')
      if (messagesRes.ok) {
        const messagesData = await messagesRes.json()
        const unreadCount = messagesData.conversations.reduce((total: number, conv: any) => 
          total + conv.unreadCount, 0)
        setStats(prev => ({ ...prev, messages: unreadCount }))
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) return null

  const user = session.user as any
  const isWorker = user.role === 'worker'
  const isProvider = user.role === 'provider'

  const workerQuickActions = [
    {
      title: 'Complete Profile',
      description: 'Add your qualifications, experience, and availability',
      action: 'Edit Profile',
      href: '/dashboard/profile',
      icon: 'PROF',
      priority: 'high'
    },
    {
      title: 'Browse Opportunities',
      description: 'Find healthcare positions that match your skills',
      action: 'Coming Soon',
      href: '#',
      icon: 'JOBS',
      priority: 'medium'
    },
    {
      title: 'Update Availability',
      description: 'Keep your schedule current for providers',
      action: 'Update Schedule',
      href: '/dashboard/profile',
      icon: 'CAL',
      priority: 'medium'
    },
    {
      title: 'Compliance Check',
      description: 'Ensure all certifications are up to date',
      action: 'Review Documents',
      href: '/dashboard/profile',
      icon: 'DOCS',
      priority: 'medium'
    }
  ]

  const providerQuickActions = [
    {
      title: 'Business Profile',
      description: 'Complete your business information and services',
      action: 'Edit Profile',
      href: '/dashboard/profile',
      icon: 'BIZ',
      priority: 'high'
    },
    {
      title: 'Find Workers',
      description: 'Search for qualified healthcare professionals',
      action: 'Coming Soon',
      href: '#',
      icon: 'STAFF',
      priority: 'high'
    },
    {
      title: 'Interview Schedule',
      description: 'Manage video interviews with candidates',
      action: 'Schedule Interviews',
      href: '/dashboard/video',
      icon: 'VIDEO',
      priority: 'medium'
    },
    {
      title: 'Education Portal',
      description: 'Set up training programs for your staff',
      action: 'Setup Portal',
      href: '/dashboard/profile',
      icon: 'EDU',
      priority: 'low'
    }
  ]

  const quickActions = isWorker ? workerQuickActions : providerQuickActions

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-[#1a1a2e] text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[#C8A951] font-bold text-xl">Central Alliance Care</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-[#C8A951] font-medium">Dashboard</Link>
              <Link href="/dashboard/profile" className="hover:text-[#C8A951] transition">Profile</Link>
              <Link href="/dashboard/messages" className="hover:text-[#C8A951] transition flex items-center gap-2">
                Messages
                {stats.messages > 0 && (
                  <span className="bg-[#C8A951] text-[#1a1a2e] text-xs px-2 py-0.5 rounded-full">
                    {stats.messages}
                  </span>
                )}
              </Link>
              <Link href="/dashboard/video" className="hover:text-[#C8A951] transition">Video Call</Link>
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

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">
            Welcome back, {user.name || 'User'}
          </h2>
          <p className="text-gray-500 text-lg">
            {isWorker 
              ? 'Manage your healthcare career and connect with providers.'
              : 'Find qualified healthcare workers and manage your team.'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 bg-[#C8A951] text-[#1a1a2e] rounded-lg flex items-center justify-center text-xs font-bold">PROF</span>
              <span className="text-2xl font-bold text-[#C8A951]">{stats.profileCompletion}%</span>
            </div>
            <p className="text-gray-500 text-sm">Profile Completion</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-[#C8A951] h-2 rounded-full transition-all duration-300" 
                style={{ width: `${stats.profileCompletion}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 bg-[#00563F] text-white rounded-lg flex items-center justify-center text-xs font-bold">MSG</span>
              <span className="text-2xl font-bold text-[#00563F]">{stats.messages}</span>
            </div>
            <p className="text-gray-500 text-sm">Unread Messages</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 bg-[#1a1a2e] text-white rounded-lg flex items-center justify-center text-xs font-bold">CAL</span>
              <span className="text-2xl font-bold text-[#1a1a2e]">{stats.upcoming}</span>
            </div>
            <p className="text-gray-500 text-sm">
              {isWorker ? 'Upcoming Interviews' : 'Scheduled Interviews'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 bg-[#00563F] text-white rounded-lg flex items-center justify-center text-xs font-bold">{isWorker ? 'APP' : 'TEAM'}</span>
              <span className="text-2xl font-bold text-[#00563F]">0</span>
            </div>
            <p className="text-gray-500 text-sm">
              {isWorker ? 'Active Applications' : 'Active Workers'}
            </p>
          </div>
        </div>

        {/* Role-specific Welcome Message */}
        <div className="bg-gradient-to-r from-[#00563F] to-[#1a1a2e] rounded-2xl p-8 mb-8 text-white">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold mb-4">
              {isWorker ? 'Build Your Healthcare Career' : 'Grow Your Healthcare Team'}
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              {isWorker 
                ? 'Connect with leading healthcare providers across Australia. Complete your profile to showcase your skills and find your next opportunity in disability care or aged care.'
                : 'Find qualified healthcare workers including AINs, ENs, RNs, and coordinators. Use our platform to streamline hiring, compliance, and team management.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard/profile"
                className="bg-[#C8A951] text-[#1a1a2e] px-6 py-3 rounded-lg font-semibold hover:bg-white transition inline-flex items-center gap-2"
              >
                <span className="text-xs font-bold bg-[#1a1a2e] text-[#C8A951] px-2 py-1 rounded">PROF</span>
                Complete Profile
              </Link>
              <Link
                href="/dashboard/messages"
                className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition inline-flex items-center gap-2"
              >
                <span className="text-xs font-bold bg-white text-[#1a1a2e] px-2 py-1 rounded">MSG</span>
                Start Networking
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#1a1a2e] mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#00563F] text-white rounded-lg flex items-center justify-center text-xs font-bold">{action.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-[#1a1a2e] text-lg">{action.title}</h4>
                      {action.priority === 'high' && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Priority</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{action.description}</p>
                    <Link
                      href={action.href}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                        action.priority === 'high'
                          ? 'bg-[#00563F] text-white hover:bg-[#C8A951]'
                          : 'border-2 border-[#00563F] text-[#00563F] hover:bg-[#00563F] hover:text-white'
                      }`}
                    >
                      {action.action}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-[#1a1a2e] mb-4">Recent Activity</h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-lg flex items-center justify-center text-sm font-bold mx-auto mb-4">ACTIVITY</div>
            <h4 className="font-medium text-gray-800 mb-2">No recent activity</h4>
            <p className="text-gray-500 text-sm">
              {isWorker 
                ? 'Start by completing your profile and applying to positions.'
                : 'Begin by posting job opportunities and reviewing worker profiles.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
