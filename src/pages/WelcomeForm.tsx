import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, MessageSquare, Mic, Workflow } from 'lucide-react';

interface LandingPageProps {
  setUserInfo: (info: { name: string; email: string; phone: string }) => void;
}

interface Testimonial {
  quote: string;
  author: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface WebhookResponse {
  success: boolean;
  error?: string;
}

export default function LandingPage({ setUserInfo }: LandingPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const WEBHOOK_URLS = {
    make: 'https://hook.us1.make.com/rx7tgruin8flm9oaxkqkh64vlc2hdfnb',
    n8n: 'https://n8n.aivoiceagents.ca/webhook/sales-funnel-manoj-saharan'
  };

  const testimonials: Testimonial[] = [
    {
      quote: "The AI audit revealed potential savings of over $50,000 per year for our business. I'm amazed!",
      author: "Sarah Johnson, CEO"
    },
    {
      quote: "After implementing AI solutions, our customer engagement improved by 40% and workload decreased significantly.",
      author: "Michael Chen, Operations Director"
    }
  ];

  const benefits: Benefit[] = [
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

  const sendToWebhook = async (url: string, data: object): Promise<WebhookResponse> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Failed to send data to ${url}`);
      }

      return { success: true };
    } catch (error) {
      console.error(`Error sending to ${url}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const data = { name, email, phone };

    try {
      // Send to both webhooks in parallel
      const [makeResult, n8nResult] = await Promise.all([
        sendToWebhook(WEBHOOK_URLS.make, data),
        sendToWebhook(WEBHOOK_URLS.n8n, data)
      ]);

      // Check if both webhooks were successful
      if (!makeResult.success || !n8nResult.success) {
        throw new Error('Failed to send data to one or more services');
      }

      // Update user info and navigate on success
      setUserInfo(data);
      navigate('/assessment');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('There was an issue submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          AI Value Assessment Tool for Your Business
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Unlock the future of your business with AI-powered solutions
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 mb-12 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-[#6EC6FF]">Get Your Free AI Audit</h2>
        <p className="text-gray-400 mb-6">
          Discover how AI can revolutionize your business operations. Our cutting-edge AI Value Assessment Tool analyzes your
          business needs and recommends tailored AI solutions to boost efficiency, customer satisfaction, and revenue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Get My Free AI Audit →'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-lg font-semibold mb-2 text-[#6EC6FF]">AI Chatbots</h3>
          <p className="text-gray-400">Enhance customer support with intelligent, 24/7 virtual assistants.</p>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
          <Mic className="h-12 w-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-lg font-semibold mb-2 text-[#6EC6FF]">Voice Agents</h3>
          <p className="text-gray-400">Implement voice-activated solutions for seamless, hands-free interactions.</p>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
          <Workflow className="h-12 w-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-lg font-semibold mb-2 text-[#6EC6FF]">Workflow Automation</h3>
          <p className="text-gray-400">Streamline operations with AI-powered process optimization.</p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#6EC6FF]">What Business Leaders Are Saying</h2>
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
        <h2 className="text-2xl font-bold text-center mb-8 text-[#6EC6FF]">Unlock Your Business Potential</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-[#6EC6FF]">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}