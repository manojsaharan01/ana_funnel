import Link from 'next/link';
import Image from 'next/image';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-purple-100 dark:border-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-logo_talent%20(1)-Q6T36B9KOKp9cnFPFqOtDfxjWJrHZP.png"
              alt="The Talent Warehouse"
              width={150} 
              height={40}
              className="h-10 w-auto cursor-pointer"
              priority
            />
          </Link>

          {/* Right Side (Theme Toggle + CTA) */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-purple-600" />
              ) : (
                <Moon className="h-5 w-5 text-purple-600" />
              )}
            </button>

            <a
              href="https://cal.com/manojsaharan/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
