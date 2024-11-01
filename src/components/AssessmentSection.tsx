import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssessmentSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  question: string;
  value: string;
  additionalInputs?: Array<{
    id: string;
    label: string;
    type: string;
  }>;
  additionalValues?: Record<string, string>;
  onChange: (id: string, value: string) => void;
  calculation: (value: number, additionalValues?: Record<string, number>) => {
    savings: number;
    source: string;
    citations?: Array<{ text: string; url: string }>;
  };
}

export default function AssessmentSection({
  id,
  title,
  icon: Icon,
  question,
  value,
  additionalInputs,
  additionalValues,
  onChange,
  calculation
}: AssessmentSectionProps) {
  const numericValue = Number(value) || 0;
  const numericAdditionalValues = additionalValues 
    ? Object.entries(additionalValues).reduce((acc, [key, val]) => ({
        ...acc,
        [key]: Number(val) || 0
      }), {})
    : undefined;

  const result = calculation(numericValue, numericAdditionalValues);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-purple-100 dark:border-purple-900"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        <label className="block text-sm text-gray-600 dark:text-gray-300">
          {question}
        </label>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
        />

        {additionalInputs?.map((input) => (
          <div key={input.id} className="space-y-2">
            <label className="block text-sm text-gray-600 dark:text-gray-300">
              {input.label}
            </label>
            <input
              type={input.type}
              min="0"
              value={additionalValues?.[input.id] || ''}
              onChange={(e) => onChange(input.id, e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        ))}
        
        {result && (value || Object.values(additionalValues || {}).some(v => v)) && (
          <div className="mt-4 space-y-4">
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Potential Annual Savings: ${result.savings.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {result.source}
            </p>
            {result.citations && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Key Statistics:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {result.citations.map((citation, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
                      {citation.text}{' '}
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-500 underline"
                      >
                        [Source]
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}