import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, BarChart3, Shield, Heart, Star, ArrowRight, CheckCircle, Baby, User, GraduationCap } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Everything Your Family Needs to Stay Safe Online
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Expert guidance, fun activities, and practical tools—all completely free
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>For ages 5-17</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Takes 10 minutes to start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>100% free, always</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="space-y-20">
          {/* For Kids */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-4">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">For Kids</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Fun Learning Activities
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Help your kids learn about privacy and safety through stories and games they'll actually enjoy
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Interactive Privacy Panda stories</strong>
                      <p className="text-gray-600">Follow Privacy Panda on adventures that teach important lessons</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">8 educational games & activities</strong>
                      <p className="text-gray-600">Puzzles, coloring, and fun challenges that teach privacy basics</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Age-appropriate content (5-17)</strong>
                      <p className="text-gray-600">Different activities for young kids, tweens, and teens</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Certificates and achievements</strong>
                      <p className="text-gray-600">Kids earn rewards as they learn</p>
                    </div>
                  </li>
                </ul>
                <Link
                  to="/privacy-panda"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Try Activities
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 md:p-12 h-full flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <Baby className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <span className="text-sm font-semibold text-gray-700">Ages 5-8</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <span className="text-sm font-semibold text-gray-700">Ages 9-12</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md text-center">
                    <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <span className="text-sm font-semibold text-gray-700">Ages 13-17</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* For Parents */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-blue-100 to-cyan-100 p-8 md:p-12 h-full flex items-center justify-center">
                <div className="text-center">
                  <Shield className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-gray-800">50+ Guides</p>
                  <p className="text-gray-600">Step-by-step help</p>
                </div>
              </div>
              <div className="order-1 md:order-2 p-8 md:p-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">For Parents</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Expert Guidance
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Simple, practical advice to help you keep your kids safe—even if you're not a tech expert
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Step-by-step privacy guides</strong>
                      <p className="text-gray-600">Easy instructions for apps like TikTok, Roblox, and YouTube</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Conversation starters</strong>
                      <p className="text-gray-600">Scripts to help you talk to your kids about online safety</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Device setup help</strong>
                      <p className="text-gray-600">Configure parental controls on phones, tablets, and computers</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Emergency safety tips</strong>
                      <p className="text-gray-600">What to do if something goes wrong</p>
                    </div>
                  </li>
                </ul>
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  View Parent Resources
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* For Families */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-4">
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">For Families</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Track Progress Together
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  See how your family is learning and get personalized recommendations
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Family dashboard</strong>
                      <p className="text-gray-600">See what each child is learning in one place</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Progress tracking</strong>
                      <p className="text-gray-600">Watch your kids complete activities and earn achievements</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Privacy report card</strong>
                      <p className="text-gray-600">See which apps your kids use and how to make them safer</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900">Personalized recommendations</strong>
                      <p className="text-gray-600">Get tips tailored to your family's needs</p>
                    </div>
                  </li>
                </ul>
                <Link
                  to="/family-hub"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Join Family Hub
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-8 md:p-12 h-full flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-24 h-24 text-green-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-gray-800">Track & Learn</p>
                  <p className="text-gray-600">Together as a family</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Families Love PandaGarde */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Families Love PandaGarde
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join over 1,000 families who trust PandaGarde for online safety education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Free Forever</h3>
              <p className="text-gray-600">
                No hidden costs, no credit card required, no premium tiers
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Signup to Start</h3>
              <p className="text-gray-600">
                Try activities immediately—create an account only when you're ready
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy-First</h3>
              <p className="text-gray-600">
                Your family's data stays on your device—we practice what we teach
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted by 1,000+ Families</h3>
              <p className="text-gray-600">
                Real parents using PandaGarde to keep their kids safe online
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Start protecting your family today—it takes just 10 minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/privacy-panda"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors font-bold text-lg"
            >
              Start Free Activities
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-colors font-bold text-lg border-2 border-white"
            >
              Take 2-Min Quiz
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-green-200 mt-6 text-sm">
            Trusted by 1,000+ families • No credit card • Privacy-first
          </p>
        </div>
      </section>
    </main>
  );
};

export default FeaturesPage;
