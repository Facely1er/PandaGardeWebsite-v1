import React from 'react';
import { ArrowLeft, Mail, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/forms/ContactForm';
import Logo from '../components/Logo';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='80' cy='40' r='1' fill='rgba(255,255,255,0.05)'/><circle cx='40' cy='80' r='1' fill='rgba(255,255,255,0.1)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23grain)'/></svg>")`
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <MessageCircle size={16} />
              <span className="text-sm font-semibold">CONTACT US</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Get in Touch
              <span className="block text-yellow-300">We're Here to Help</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Have questions about PandaGarde or need support with privacy education?
              We'd love to hear from you and help you on your digital privacy journey.
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-50" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            style={{ color: 'var(--primary-light)' }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16">
        <ContactForm />
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--gray-600)' }}>
              Quick answers to common questions about PandaGarde and privacy education.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <HelpCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                      Is PandaGarde free to use?
                    </h3>
                    <p style={{ color: 'var(--gray-600)' }}>
                      Yes! PandaGarde is completely free for families and educators. We believe privacy education should be accessible to everyone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <HelpCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                      What age groups is this for?
                    </h3>
                    <p style={{ color: 'var(--gray-600)' }}>
                      Our resources are designed for children ages 5-18, with age-appropriate content and activities for each stage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <HelpCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                      How do I get started?
                    </h3>
                    <p style={{ color: 'var(--gray-600)' }}>
                      Simply explore our age-appropriate resources, try the interactive activities, and follow our implementation timeline.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <HelpCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                      Can educators use this in schools?
                    </h3>
                    <p style={{ color: 'var(--gray-600)' }}>
                      Absolutely! We provide educator-specific resources and curriculum guides for classroom use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Privacy Education Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of families who are already learning about digital privacy with PandaGarde.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/activity-book"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Try Activities
            </Link>
            <Link
              to="/story"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
            >
              <Mail size={20} />
              Read Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;