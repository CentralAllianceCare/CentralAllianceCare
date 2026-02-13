import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: 'TEAM',
      title: 'Connect Professionals',
      description: 'Bridge the gap between healthcare providers and qualified workers in NDIS & Aged Care sectors.'
    },
    {
      icon: 'DOCS',
      title: 'Streamlined Compliance',
      description: 'Manage certifications, background checks, and documentation in one secure platform.'
    },
    {
      icon: 'VIDEO',
      title: 'Video Interviews',
      description: 'Conduct remote interviews and reference checks with our integrated video calling system.'
    },
    {
      icon: 'SCHEDULE',
      title: 'Smart Scheduling',
      description: 'Match availability between providers and workers with intelligent scheduling tools.'
    },
    {
      icon: 'CAREER',
      title: 'Career Growth',
      description: 'Access professional development opportunities and build meaningful healthcare careers.'
    },
    {
      icon: 'SECURITY',
      title: 'Trusted Platform',
      description: 'Secure, compliant platform trusted by healthcare professionals across Australia.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Registered Nurse',
      content: 'Central Alliance Care helped me find my dream position in disability care. The platform made it easy to showcase my qualifications and connect with the right providers.',
      avatar: 'SC'
    },
    {
      name: 'Melbourne Care Services',
      role: 'Healthcare Provider',
      content: 'We\'ve streamlined our hiring process dramatically. The compliance tracking and video interviews have saved us weeks of administrative work.',
      avatar: 'MCS'
    },
    {
      name: 'James Wong',
      role: 'Care Coordinator',
      content: 'The platform\'s scheduling system and reference checks give me confidence that we\'re hiring the best candidates for our clients.',
      avatar: 'JW'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-[#C8A951] font-bold text-2xl">Central Alliance Care</div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <a href="#features" className="hover:text-[#C8A951] transition">Features</a>
                <a href="#how-it-works" className="hover:text-[#C8A951] transition">How It Works</a>
                <a href="#testimonials" className="hover:text-[#C8A951] transition">Testimonials</a>
              </nav>
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-white hover:text-[#C8A951] transition font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-[#C8A951] text-[#1a1a2e] px-6 py-2 rounded-lg font-semibold hover:bg-white transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #00563F 50%, #C8A951 100%)',
            opacity: 0.05
          }}
        ></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1a1a2e] mb-6 leading-tight">
            Connecting Healthcare
            <br />
            <span className="text-[#00563F]">Professionals</span> Across
            <br />
            <span className="text-[#C8A951]">Australia</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The premier platform for NDIS and Aged Care staffing. Whether you&apos;re a healthcare worker seeking opportunities 
            or a provider building your team, we connect the right people at the right time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/register"
              className="bg-[#00563F] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#C8A951] transition inline-flex items-center justify-center gap-3"
            >
              <span className="text-sm font-bold bg-white text-[#00563F] px-2 py-1 rounded">WORKER</span>
              Join as Healthcare Worker
            </Link>
            <Link
              href="/register"
              className="border-2 border-[#00563F] text-[#00563F] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#00563F] hover:text-white transition inline-flex items-center justify-center gap-3"
            >
              <span className="text-sm font-bold bg-[#00563F] text-white px-2 py-1 rounded">PROVIDER</span>
              Join as Provider
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: '2,500+', label: 'Healthcare Workers' },
              { number: '450+', label: 'Provider Partners' },
              { number: '98%', label: 'Success Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-[#00563F] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools needed for successful healthcare staffing and career development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-[#00563F] text-white rounded-lg flex items-center justify-center text-xs font-semibold mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a2e] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get started on your healthcare journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* For Workers */}
            <div>
              <h3 className="text-2xl font-bold text-[#00563F] mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-[#00563F] text-white rounded-lg flex items-center justify-center text-xs font-bold">HCW</span>
                For Healthcare Workers
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Create Your Profile', desc: 'Showcase your qualifications, experience, and availability' },
                  { step: 2, title: 'Upload Compliance Documents', desc: 'Add certifications, background checks, and references' },
                  { step: 3, title: 'Connect with Providers', desc: 'Browse opportunities and schedule video interviews' },
                  { step: 4, title: 'Start Your Career', desc: 'Get matched with the perfect healthcare role for you' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#C8A951] text-[#1a1a2e] rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1a2e] mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Providers */}
            <div>
              <h3 className="text-2xl font-bold text-[#00563F] mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-[#C8A951] text-[#1a1a2e] rounded-lg flex items-center justify-center text-xs font-bold">HCP</span>
                For Healthcare Providers
              </h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Setup Business Profile', desc: 'Add your services, requirements, and company information' },
                  { step: 2, title: 'Post Opportunities', desc: 'List available positions with detailed requirements' },
                  { step: 3, title: 'Review & Interview', desc: 'Screen candidates and conduct video interviews' },
                  { step: 4, title: 'Build Your Team', desc: 'Hire qualified professionals and manage compliance' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#C8A951] text-[#1a1a2e] rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1a2e] mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-4">What People Say</h2>
            <p className="text-xl text-gray-600">Trusted by healthcare professionals across Australia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#00563F] text-white rounded-full flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a2e]">{testimonial.name}</h4>
                    <p className="text-sm text-[#C8A951]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1a1a2e] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Healthcare Staffing?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of healthcare professionals who trust Central Alliance Care for their career and staffing needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/register"
              className="bg-[#C8A951] text-[#1a1a2e] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white transition"
            >
              Create Free Account
            </Link>
            <Link
              href="/login"
              className="border-2 border-[#C8A951] text-[#C8A951] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#C8A951] hover:text-[#1a1a2e] transition"
            >
              Sign In
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-white/60">
            <span>• Free to join</span>
            <span>• No setup fees</span>
            <span>• Secure platform</span>
            <span>• Australian owned</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00563F] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-[#C8A951] font-bold text-xl mb-4">Central Alliance Care</div>
              <p className="text-white/80 text-sm leading-relaxed">
                Connecting healthcare professionals across Australia&apos;s NDIS and Aged Care sectors.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-[#C8A951] transition">Find Jobs</a></li>
                <li><a href="#" className="hover:text-[#C8A951] transition">Career Resources</a></li>
                <li><a href="#" className="hover:text-[#C8A951] transition">Training</a></li>
                <li><a href="#" className="hover:text-[#C8A951] transition">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-[#C8A951] transition">Post Jobs</a></li>
                <li><a href="#" className="hover:text-[#C8A951] transition">Compliance Tools</a></li>
                <li><a href="#" className="hover:text-[#C8A951] transition">Pricing</a></li>
                <li><a href="#" className="hover:text-[#C8A951] transition">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-[#C8A951] transition">About Us</a></li>
                <li><a href="#" className="hover:text-[#C8A951] transition">Contact</a></li>
                <li><a href="#" className="hover:text-[#C8A951] transition">Privacy</a></li>
                <li><a href="#" className="hover:text-[#C8A951] transition">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2024 Central Alliance Care. All rights reserved. | ABN: 12 345 678 901</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
