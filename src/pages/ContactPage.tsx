import React from 'react';
import { Mail, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/forms/ContactForm';
import PageLayout from '../components/layout/PageLayout';

const ContactPage: React.FC = () => {
  return (
    <PageLayout
      title="Get in Touch"
      subtitle="Have questions about PandaGarde or need support with privacy education? We'd love to hear from you and help you on your digital privacy journey."
      icon={MessageCircle}
      badge="CONTACT US"
    >
      {/* Contact Form Section */}
      <section style={{ marginBottom: '3rem' }}>
        <ContactForm />
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16" style={{ backgroundColor: 'var(--light)', marginTop: '3rem' }}>
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
            Begin your family's digital privacy education journey with PandaGarde today.
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
    </PageLayout>
  );
};

export default ContactPage;