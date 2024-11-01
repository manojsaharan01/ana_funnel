import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Mic, LayoutGrid } from 'lucide-react';

interface WelcomeFormProps {
  setUserInfo: (info: { name: string; email: string }) => void;
}

export default function WelcomeForm({ setUserInfo }: WelcomeFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://hook.us1.make.com/96cr4ip0smrjdq5g8db0bkgwkr3e38wm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setUserInfo({ name, email });
      navigate('/assessment');
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: 'Enhance customer support with intelligent, 24/7 virtual assistants.'
    },
    {
      icon: Mic,
      title: 'Voice Agents',
      description: 'Implement voice-activated solutions for seamless, hands-free interactions.'
    },
    {
      icon: LayoutGrid,
      title: 'Workflow Automation',
      description: 'Streamline operations with AI-powered process optimization.'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            AI Value Assessment Tool for Small Businesses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Unlock the future of your business with AI-powered solutions
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Get Your Free AI Audit
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Discover how AI can revolutionize your business. Our cutting-edge AI Value Assessment Tool analyzes your
            business needs and recommends tailored AI solutions to boost efficiency, customer satisfaction, and revenue.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your name"
                minLength={2}
                maxLength={100}
              />
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email address"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium transition-all duration-200
                  ${isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-lg hover:scale-105'}`}
              >
                {isLoading ? 'Processing...' : 'Get My AI Assessment'}
              </button>
            </div>
            {error && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-2">
                {error}
              </p>
            )}
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
            >
              <div className="flex justify-center mb-4">
                <feature.icon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}