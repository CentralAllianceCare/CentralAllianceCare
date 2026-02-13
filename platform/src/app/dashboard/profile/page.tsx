'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Profile {
  id?: string
  bio?: string
  avatar?: string
  location?: string
  // Worker fields
  qualifications?: string
  experience?: string
  expectedSalary?: string
  transport?: string
  licenseType?: string
  childrenCheck?: boolean
  ndisRegistered?: boolean
  firstAidExpiry?: string
  vaccinationDate?: string
  careerGoals?: string
  // Provider fields
  businessName?: string
  businessType?: string
  abn?: string
  servicesOffered?: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (session) loadProfile()
  }, [status, session, router])

  const loadProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setProfile(data.profile || {})
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (field: string, value: any) => {
    const updatedProfile = { ...profile, [field]: value }
    setProfile(updatedProfile)
  }

  const saveProfile = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      if (!res.ok) {
        throw new Error('Failed to save profile')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
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

  const qualificationOptions = [
    'AIN (Assistant in Nursing)',
    'EN (Enrolled Nurse)',
    'RN (Registered Nurse)',
    'Coordinator',
    'Fund Manager',
    'Quality Control',
  ]

  const businessTypeOptions = [
    { value: 'disability', label: 'Disability Services' },
    { value: 'aged_care', label: 'Aged Care' },
    { value: 'both', label: 'Both Disability & Aged Care' },
  ]

  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
  ]

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-[#1a1a2e] text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[#C8A951] font-bold text-xl">Central Alliance Care</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hover:text-[#C8A951] transition">Dashboard</Link>
              <Link href="/dashboard/profile" className="text-[#C8A951] font-medium">Profile</Link>
              <Link href="/dashboard/messages" className="hover:text-[#C8A951] transition">Messages</Link>
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

      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">
            {isWorker ? 'Worker Profile' : 'Provider Profile'}
          </h1>
          <p className="text-gray-500">
            {isWorker 
              ? 'Complete your professional profile to attract healthcare providers.'
              : 'Complete your business profile to attract qualified healthcare workers.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isWorker ? 'Full Name' : 'Contact Person'}
                  </label>
                  <input
                    type="text"
                    value={user.name || ''}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={profile?.location || ''}
                    onChange={(e) => updateProfile('location', e.target.value)}
                    placeholder="City, State"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isWorker ? 'Professional Bio' : 'Business Description'}
                  </label>
                  <textarea
                    value={profile?.bio || ''}
                    onChange={(e) => updateProfile('bio', e.target.value)}
                    placeholder={isWorker ? 
                      "Tell providers about your experience, strengths, and what makes you a great healthcare worker..." :
                      "Describe your business, values, and what sets your healthcare services apart..."}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                  />
                </div>
              </div>
            </div>

            {/* Worker-specific fields */}
            {isWorker && (
              <>
                {/* Qualifications */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Qualifications</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Qualification</label>
                      <select
                        value={profile?.qualifications || ''}
                        onChange={(e) => updateProfile('qualifications', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                      >
                        <option value="">Select your primary qualification</option>
                        {qualificationOptions.map(qual => (
                          <option key={qual} value={qual}>{qual}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience & Career Goals</label>
                      <textarea
                        value={profile?.experience || ''}
                        onChange={(e) => updateProfile('experience', e.target.value)}
                        placeholder="Describe your healthcare experience and career aspirations..."
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary (per hour)</label>
                        <input
                          type="text"
                          value={profile?.expectedSalary || ''}
                          onChange={(e) => updateProfile('expectedSalary', e.target.value)}
                          placeholder="e.g., $25-30/hour"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Transport</label>
                        <select
                          value={profile?.transport || ''}
                          onChange={(e) => updateProfile('transport', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                        >
                          <option value="">Select transport</option>
                          <option value="own_car">Own Car</option>
                          <option value="public_transport">Public Transport</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Type</label>
                      <select
                        value={profile?.licenseType || ''}
                        onChange={(e) => updateProfile('licenseType', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                      >
                        <option value="">Select license</option>
                        <option value="full">Full License</option>
                        <option value="provisional">Provisional</option>
                        <option value="none">No License</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Compliance Documents */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Compliance Documents</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium">Children Check</span>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={profile?.childrenCheck || false}
                          onChange={(e) => updateProfile('childrenCheck', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600">Completed</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium">NDIS Registration</span>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={profile?.ndisRegistered || false}
                          onChange={(e) => updateProfile('ndisRegistered', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600">Registered</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Aid Expiry</label>
                      <input
                        type="date"
                        value={profile?.firstAidExpiry || ''}
                        onChange={(e) => updateProfile('firstAidExpiry', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vaccination Date</label>
                      <input
                        type="date"
                        value={profile?.vaccinationDate || ''}
                        onChange={(e) => updateProfile('vaccinationDate', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">Note: Only requested after successful hiring</p>
                    </div>
                  </div>
                </div>

                {/* References */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">Professional References</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                    <div className="text-4xl mb-4">📞</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Live Bookable References</h3>
                    <p className="text-gray-600 text-sm mb-4">Coming soon - providers will be able to book live video calls with your references.</p>
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                      Add References (Coming Soon)
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Provider-specific fields */}
            {isProvider && (
              <>
                {/* Business Information */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">Business Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                        <input
                          type="text"
                          value={profile?.businessName || ''}
                          onChange={(e) => updateProfile('businessName', e.target.value)}
                          placeholder="Your business name"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ABN</label>
                        <input
                          type="text"
                          value={profile?.abn || ''}
                          onChange={(e) => updateProfile('abn', e.target.value)}
                          placeholder="Australian Business Number"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                      <select
                        value={profile?.businessType || ''}
                        onChange={(e) => updateProfile('businessType', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                      >
                        <option value="">Select business type</option>
                        {businessTypeOptions.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
                      <textarea
                        value={profile?.servicesOffered || ''}
                        onChange={(e) => updateProfile('servicesOffered', e.target.value)}
                        placeholder="Describe the healthcare services your business provides..."
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#00563F] transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Education Portal */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">Education Portal</h2>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="font-semibold text-gray-800 mb-2">Training & Certification Hub</h3>
                    <p className="text-gray-600 text-sm mb-4">Coming soon - manage training programs and certifications for your staff.</p>
                    <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
                      Setup Education Portal (Coming Soon)
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Availability/Timetable */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-[#1a1a2e] mb-6">
                {isWorker ? 'Availability Schedule' : 'Service & Interview Schedule'}
              </h2>
              
              <div className="space-y-6">
                {isProvider && (
                  <div className="flex gap-4 mb-4">
                    <button className="px-4 py-2 bg-[#00563F] text-white rounded-lg text-sm font-medium">
                      Service Hours
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      Interview Times
                    </button>
                  </div>
                )}
                
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Interactive Schedule</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {isWorker ? 
                      'Set your availability for providers to see when you can work.' :
                      'Set your service hours and available times for worker interviews.'}
                  </p>
                  <button className="bg-[#00563F] text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Setup Schedule (Coming Soon)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[#1a1a2e] mb-4">Profile Picture</h3>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl text-gray-400 mb-4">
                  {user.name?.[0] || '👤'}
                </div>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                  Upload Photo
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">Recommended: 400x400px, max 2MB</p>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[#1a1a2e] mb-4">Profile Completion</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Basic Info</span>
                  <span className="text-[#00563F]">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#00563F] h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-gray-500">Complete your profile to increase visibility</p>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full bg-[#C8A951] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#00563F] transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}