import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle, Star, Users, Calendar, BookOpen, Shield } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import { useToast } from '../contexts/ToastContext';

const NewsletterPage: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showError('Email Required', 'Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsSubscribed(true);
      showSuccess('Successfully Subscribed!', 'Thank you for joining our privacy education newsletter.');
      setEmail('');
    } catch {
      showError('Subscription Failed', 'There was an error subscribing. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const newsletterFeatures = [
    {
      icon: Calendar,
      title: 'Monthly Privacy Tips',
      description: 'Get the latest privacy tips and best practices delivered to your inbox.'
    },
    {
      icon: BookOpen,
      title: 'New Activity Releases',
      description: 'Be the first to know about new educational activities and resources.'
    },
    {
      icon: Shield,
      title: 'Privacy News Updates',
      description: 'Stay informed about important privacy developments and legislation.'
    },
    {
      icon: Users,
      title: 'Community Highlights',
      description: 'See how other families are using PandaGarde to teach privacy.'
    }
  ];

  const recentNewsletters = [
    {
      title: 'December 2024: Holiday Privacy Safety',
      date: 'December 15, 2024',
      preview: 'Learn how to protect your family\'s privacy during the holiday season...',
      featured: true
    },
    {
      title: 'November 2024: Social Media Privacy for Teens',
      date: 'November 15, 2024',
      preview: 'Essential tips for helping teenagers navigate social media safely...',
      featured: false
    },
    {
      title: 'October 2024: Back to School Privacy',
      date: 'October 15, 2024',
      preview: 'Privacy considerations for students returning to school...',
      featured: false
    }
  ];

  return (
    <PageLayout
      title="Privacy Education Newsletter"
      subtitle="Stay updated with the latest privacy education news, new activities, and expert tips to help your family navigate the digital world safely."
      icon={Mail}
      badge="NEWSLETTER"
      breadcrumbs={true}
    >

      {/* Subscription Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
            Join Our Privacy Education Community
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--gray-600)' }}>
            Get monthly updates with the latest privacy education resources, activities, and expert tips
            delivered directly to your inbox. No spam, just valuable content for your family.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  disabled={isSubscribing}
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Successfully Subscribed!</h3>
              <p className="text-green-700">
                Thank you for joining our privacy education community. You'll receive your first newsletter soon!
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {newsletterFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Newsletters */}
      <section className="bg-gray-50 py-16" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              Recent Newsletters
            </h2>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
              See what our community has been learning about digital privacy.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {recentNewsletters.map((newsletter, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all ${
                    newsletter.featured ? 'border-2 border-pink-500' : ''
                  }`}
                  style={{ backgroundColor: 'var(--card-color)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
                          {newsletter.title}
                        </h3>
                        {newsletter.featured && (
                          <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{newsletter.date}</p>
                      <p className="text-gray-600">{newsletter.preview}</p>
                    </div>
                    <button className="ml-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 transition-all">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Promise */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
            Our Privacy Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-green-600" />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                No Spam
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                We only send valuable content about privacy education. No promotional spam.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-blue-600" />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                Easy Unsubscribe
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Unsubscribe anytime with one click. We respect your inbox.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                Data Protection
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                We never share your email with third parties. Your privacy is protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Stay Informed?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of families who are already learning about digital privacy with our monthly newsletter.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/activity-book"
              className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <BookOpen size={20} />
              Try Activities
            </Link>
            <Link to="/family-hub"
              className="bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-800 transition-colors inline-flex items-center gap-2"
            >
              <Users size={20} />
              Family Hub
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NewsletterPage;