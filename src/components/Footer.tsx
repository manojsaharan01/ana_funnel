import { Bot, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-purple-100 dark:border-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-purple-600" />
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Ana
            </span>
          </div>
          
          <div className="flex space-x-8">
            <a href="mailto:contact@aigrowthcreators.com" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <Mail className="h-5 w-5" />
              <span>avoiceagents@gmail.com</span>
            </a>
            <a href="tel:+1234567890" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <Phone className="h-5 w-5" />
              <span></span>
            </a>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 The Talent Warehouse AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}