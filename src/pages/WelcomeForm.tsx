import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, MessageSquare, Mic, Workflow } from 'lucide-react';

interface LandingPageProps {
  setUserInfo: (info: { name: string; email: string }) => void;
}

export default function LandingPage({ setUserInfo }: LandingPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserInfo({ name, email });
    navigate('/assessment');
  };

  const testimonials = [
    {
      quote: "The AI audit revealed potential savings of over $50,000 per year for our business. I'm amazed!",
      author: "Sarah Johnson, CEO"
    },
    {
      quote: "After implementing AI solutions, our customer engagement improved by 40% and workload decreased significantly.",
      author: "Michael Chen, Operations Director"
    }
  ];

  const benefits = [
    {
      title: "Boost Revenue",
      description: "Increase your business revenue by 15-25% in your first year with AI-powered customer engagement",
      icon: "📈"
    },
    {
      title: "Reduce Missed Opportunities",
      description: "Cut down missed opportunities by up to 30% with AI-powered response systems",
      icon: "📅"
    },
    {
      title: "Save Time",
      description: "Automate up to 50-60% of repetitive tasks, allowing your team to focus on growth",
      icon: "⚡"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          AI Value Assessment Tool for Small Businesses
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Unlock the future of your business with AI-powered solutions
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 mb-12 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Get Your Free AI Audit</h2>
        <p className="text-gray-400 mb-6">
          Discover how AI can revolutionize your business operations. Our cutting-edge AI Value Assessment Tool analyzes your
          business needs and recommends tailored AI solutions to boost efficiency, customer satisfaction, and revenue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300"
          >
            Get My Free AI Audit →
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-lg font-semibold mb-2">AI Chatbots</h3>
          <p className="text-gray-400">Enhance customer support with intelligent, 24/7 virtual assistants.</p>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
          <Mic className="h-12 w-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-lg font-semibold mb-2">Voice Agents</h3>
          <p className="text-gray-400">Implement voice-activated solutions for seamless, hands-free interactions.</p>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
          <Workflow className="h-12 w-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-lg font-semibold mb-2">Workflow Automation</h3>
          <p className="text-gray-400">Streamline operations with AI-powered process optimization.</p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">What Business Leaders Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
              <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
              <p className="text-sm text-purple-500">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Unlock Your Business Potential</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}