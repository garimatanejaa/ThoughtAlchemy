import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Blend, Eye, ArrowRight, Play, Star, Users, BookOpen, Target, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
// Animated Background Component

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-bounce opacity-80"></div>
      <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-50"></div>
      <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute bottom-20 left-1/2 w-1 h-1 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/3 left-20 w-8 h-8 border border-purple-200 rounded-full animate-spin opacity-30" style={{ animationDuration: '20s' }}></div>
      <div className="absolute top-1/4 right-32 w-6 h-6 bg-gradient-to-r from-purple-200 to-yellow-200 rounded-lg animate-bounce opacity-40" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 border border-yellow-200 rotate-45 animate-pulse opacity-50"></div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-purple-100/50 group">
      <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

// Testimonial Component
const TestimonialCard = ({ name, role, content, avatar }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50">
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">"{content}"</p>
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full ${avatar} flex items-center justify-center text-white font-semibold`}>
          {name[0]}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-600">{role}</div>
        </div>
      </div>
    </div>
  );
};

// Stats Component


// Main Homepage Component
const ThoughtAlchemyHomepage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const navigate = useNavigate();
  const features = [
    {
      icon: Zap,
      title: "Transform Ideas",
      description: "Convert your raw thoughts into polished pitches, beautiful poems, or actionable plans with AI-powered transformation.",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      icon: Blend,
      title: "Blend Concepts",
      description: "Merge two different ideas into something completely new and innovative. Watch magic happen as concepts collide.",
      gradient: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      icon: Eye,
      title: "DNA Mapping",
      description: "Visualize the creative journey of your ideas with detailed DNA mapping showing transformation patterns.",
      gradient: "bg-gradient-to-r from-purple-600 to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      content: "ThoughtAlchemy transformed how I approach brainstorming. The blend feature is absolutely magical!",
      avatar: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      content: "Turned my scattered thoughts into a winning pitch deck. This tool is a game-changer for entrepreneurs.",
      avatar: "bg-gradient-to-r from-blue-500 to-purple-500"
    },
    {
      name: "Emily Watson",
      role: "Content Writer",
      content: "The poetry transformation feature helped me discover a new creative voice I never knew I had.",
      avatar: "bg-gradient-to-r from-yellow-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 mb-8">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700">AI-Powered Creative Transformation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-gray-800 mb-8 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Ideas Into Magic
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Turn scattered thoughts into polished pitches, blend concepts into innovations, 
              and visualize your creative DNA with our revolutionary AI platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-yellow-400 text-white font-semibold rounded-xl shadow-2xl hover:from-purple-600 hover:to-yellow-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl flex items-center space-x-2">
                <span>Start Creating Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setIsVideoPlaying(true)}
                className="group flex items-center space-x-3 px-6 py-4 bg-white/70 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border border-purple-200 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

          
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-6">
              Unleash Your Creative Potential
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three powerful tools designed to transform how you think, create, and innovate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-6">
              Simple. Powerful. Magical.
            </h2>
            <p className="text-xl text-gray-600">
              Transform your ideas in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Input Your Idea</h3>
              <p className="text-gray-600">
                Share your raw thoughts, concepts, or scattered ideas in our intuitive interface.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Choose Transformation</h3>
              <p className="text-gray-600">
                Select how you want to transform your idea: pitch, poem, plan, or blend with another concept.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Target  className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Get Results</h3>
              <p className="text-gray-600">
              Receive your polished, professional result with visual DNA mapping of the transformation.
              </p>
            </div>

            
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-yellow-400 text-white font-semibold rounded-xl shadow-xl hover:from-purple-600 hover:to-yellow-500 transition-all duration-300 transform hover:-translate-y-1">
              Try It Now!!
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 mb-6">
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700">Loved by 10,000+ Creators</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-6">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500 to-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-6">
            Ready to Transform Your Ideas?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join the amazing community of creators who are already using ThoughtAlchemy to turn their ideas into magic.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-2xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl">
              Start Free Today
            </button>
            
            <button className="px-6 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>

          
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold">ThoughtAlchemy</h3>
                  <p className="text-sm text-gray-400">Transform • Blend • Create</p>
                </div>
              </div>
              <p className="text-gray-300 max-w-md">
                Empowering creators worldwide to transform their ideas into reality with AI-powered creative tools.
              </p>
            </div>

            

            
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ThoughtAlchemy. All rights reserved. Made with ✨ for creators by Garima.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold">ThoughtAlchemy Demo</h3>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-purple-100 to-yellow-100 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-gray-600">Demo video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThoughtAlchemyHomepage;