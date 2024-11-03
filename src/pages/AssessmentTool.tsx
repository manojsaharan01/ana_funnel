import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Calendar, Workflow, Boxes, X } from 'lucide-react';
import AssessmentSection from '../components/AssessmentSection';

interface AssessmentToolProps {
  userInfo: {
    name: string;
    email: string;
  };
}

export default function AssessmentTool({ userInfo }: AssessmentToolProps) {
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    customerService: '',
    virtualReceptionist: '',
    appointmentSetter: '',
    onboarding: '',
    onboardingSalary: '',
    workflow: ''
  });

  const sections = [
    {
      id: 'customerService',
      title: 'Customer Service AI Agent',
      icon: MessageSquare,
      question: 'What is your current annual customer service budget?',
      calculation: (value: number) => ({ 
        savings: Math.round(value * 0.7),
        source: 'Industry research shows significant cost reduction with AI implementation',
        citations: [
          {
            text: 'Klarna reduced support ticket resolution time from 11 minutes to 2 minutes, generating $40 million in annual profit improvements',
            url: 'https://www.singlegrain.com/blog/ms/klarna-ai/'
          },
          {
            text: 'Businesses typically save around 30% on their customer support costs by implementing chatbots',
            url: 'https://adamconnell.me/chatbot-statistics/'
          },
          {
            text: 'Companies can reduce their cost per support ticket from $40 to $8, representing an 80% reduction',
            url: 'https://ai-for.business/ai-case-study-saving-80-on-customer-support-costs-with-generative-ai/'
          }
        ]
      })
    },
    {
      id: 'virtualReceptionist',
      title: 'Virtual Receptionist',
      icon: Bot,
      question: 'How many calls does your business receive per month?',
      additionalInputs: [
        {
          id: 'perLeadValue',
          label: 'Average value per lead ($)',
          type: 'number'
        }
      ],
      calculation: (value: number, additionalValues?: Record<string, number>) => {
        const perLeadValue = additionalValues?.perLeadValue || 100; // Default to $100 if not provided
        const missedCalls = Math.round(value * 0.25); // 25% of calls are missed
        const potentialRevenue = missedCalls * perLeadValue;
    
        return {
          savings: potentialRevenue,
          source: `Based on ${missedCalls.toLocaleString()} typically missed calls (25%) at $${perLeadValue} average value per lead`,
          citations: [
            {
              text: 'AI virtual receptionists can handle up to 100 calls simultaneously for a single phone number',
              url: 'https://dialzara.com/blog/what-is-an-ai-virtual-receptionist-and-how-can-it-benefit-your-business/'
            },
            {
              text: 'One business documented savings of $20,000 in lost revenue within just 30 days',
              url: 'https://www.reddit.com/r/SideProject/comments/1e2kbdz/i_recreated_an_ai_phone_agent_that_saved_20000_in/'
            },
            {
              text: 'Companies can save up to $250,000 over five years compared to employing full-time reception staff',
              url: 'https://dialzara.com/blog/how-much-does-an-ai-virtual-receptionist-cost/'
            }
          ]
        };
      }
    },
    {
      id: 'appointmentSetter',
      title: 'AI Appointment Setter',
      icon: Calendar,
      question: 'How many leads do you receive per month?',
      additionalInputs: [
        {
          id: 'avgDealValue',
          label: 'Average deal value per lead ($)',
          type: 'number'
        }
      ],
      calculation: (value: number, additionalValues?: { avgDealValue?: number }) => {
        const avgDealValue = additionalValues?.avgDealValue || 1000; // Default to $1000 if not provided
        const currentConversionRate = 0.04; // 4% current conversion rate
        const aiConversionRate = 0.21; // 21% AI conversion rate
        
        const currentRevenue = value * currentConversionRate * avgDealValue;
        const potentialRevenue = value * aiConversionRate * avgDealValue;
        const additionalRevenue = potentialRevenue - currentRevenue;
        
        return {
          savings: Math.round(additionalRevenue),
          source: `Based on increasing conversion rate from 4% to 21% with 5-minute response time, at $${avgDealValue} average deal value`,
          citations: [
            {
              text: 'Companies that contact leads within 5 minutes are 21 times more likely to qualify them compared to waiting 30 minutes',
              url: 'https://www.callpage.io/blog/posts/speed-to-lead'
            },
            {
              text: 'Harvard study shows reaching out to leads within 10 seconds can increase conversion rates by up to 381%',
              url: 'https://www.trysetter.com/ai-appointment-setter'
            },
            {
              text: 'One HVAC company experienced a 20% increase in bookings and conversions in just the first week of implementing AI calling',
              url: 'https://www.reddit.com/r/SideProject/comments/1e2kbdz/i_recreated_an_ai_phone_agent_that_saved_20000_in/'
            }
          ]
        };
      }
    },
    {
      id: 'onboarding',
      title: 'One-Click Onboarding',
      icon: Boxes,
      question: 'How many new clients do you onboard monthly?',
      additionalInputs: [
        {
          id: 'onboardingSalary',
          label: 'Monthly salary for onboarding staff ($)',
          type: 'number'
        },
        {
          id: 'currentOnboardingHours',
          label: 'Current onboarding time per client (hours)',
          type: 'number'
        }
      ],
      calculation: (value: number, additionalValues?: Record<string, number>) => {
        const onboardingSalary = additionalValues?.onboardingSalary || 4000; // Default salary if not provided
        const onboardingTimeReduction = 0.90; // 90% reduction
        
        // Use the provided `currentOnboardingHours` if available, otherwise default to 20 hours
        const oldOnboardingTimeHours = additionalValues?.currentOnboardingHours || 20;
        
        const newOnboardingTimeHours = oldOnboardingTimeHours * (1 - onboardingTimeReduction);
    
        const hourlyRate = onboardingSalary / 160; // Monthly salary to hourly rate
        const currentMonthlyCost = value * oldOnboardingTimeHours * hourlyRate;
        const newMonthlyCost = value * newOnboardingTimeHours * hourlyRate;
        const monthlySavings = currentMonthlyCost - newMonthlyCost;
        const annualSavings = monthlySavings * 12;
  
        return {
          savings: Math.round(annualSavings),
          source: `Based on ${Math.round(value)} new clients per month, reducing onboarding time from ${Math.round(oldOnboardingTimeHours)} hours to ${Math.round(newOnboardingTimeHours)} hours per client.`,
          citations: [
            {
              text: 'Companies report reducing onboarding time from 5+ days to just 10 minutes through automation, representing a 90% reduction in processing time',
              url: 'https://qflowbpm.com/process-onboarding/'
            },
            {
              text: 'Organizations with automated onboarding processes experience up to 60% year-over-year revenue growth and show 82% improvement in new hire retention',
              url: 'https://enboarder.com/blog/employee-engagement-onboarding-stats/'
            },
            {
              text: 'Poor onboarding leads to significant costs, with companies losing up to 20% of an employee\'s salary when they leave within the first 6-12 months',
              url: 'https://withe.co/blog/employee-onboarding-statistics'
            }
          ]
        };
      }
    },
    {
      id: 'workflow',
      title: 'Workflow Automation',
      icon: Workflow,
      question: 'How many hours per month do you spend on manual workflows?',
      additionalInputs: [
        {
          id: 'manualHourlyRate',
          label: 'Average cost of manual hour ($)',
          type: 'number'
        }
      ],
      calculation: (value: number, additionalValues?: { manualHourlyRate?: number }) => {
        const hourlyRate = additionalValues?.manualHourlyRate || 50; // Default to $50 if not provided
        const errorCostMultiplier = 200;
        const currentErrorRate = 0.15;
    
        // Current costs
        const currentLaborCost = value * hourlyRate;
        const currentErrorCost = (value * currentErrorRate) * errorCostMultiplier;
        const totalCurrentCost = currentLaborCost + currentErrorCost;
    
        // AI-automated costs (70% reduction in hours, 90% reduction in errors)
        const aiHours = value * 0.3;
        const aiLaborCost = aiHours * hourlyRate;
        const aiErrorCost = (aiHours * (currentErrorRate * 0.1)) * errorCostMultiplier;
        const totalAiCost = aiLaborCost + aiErrorCost;
    
        const monthlySavings = totalCurrentCost - totalAiCost;
        const annualSavings = monthlySavings * 12;
    
        return {
          savings: Math.round(annualSavings),
          source: `Based on ${value} monthly manual hours at $${hourlyRate}/hour with error reduction from 15% to 1.5%`,
          citations: [
            {
              text: 'Organizations report 70% reduction in manual processing time and 90% reduction in error rates with AI automation',
              url: 'https://beslick.com/what-is-ai-workflow-automation/'
            },
            {
              text: 'AI workflow automation scales operations without additional human resources, handling complex tasks including unstructured data',
              url: 'https://www.pulpstream.com/resources/blog/ai-workflow-automation'
            },
            {
              text: 'Businesses report improved decision-making and enhanced customer experience through faster response times',
              url: 'https://www.leewayhertz.com/ai-for-workflow-automation/'
            }
          ]
        };
      }
    }
  ];

  const handleInputChange = (id: string, value: string) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const calculateTotalSavings = () => {
    return sections.reduce((total, section) => {
      const value = Number(values[section.id as keyof typeof values]) || 0;
      const additionalValues = section.additionalInputs?.reduce((acc, input) => ({
        ...acc,
        [input.id]: Number(values[input.id as keyof typeof values]) || 0
      }), {});
      return total + section.calculation(value, additionalValues).savings;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent [text-shadow:0_0_10px_rgba(139,92,246,0.3)]">
            Your AI Value Assessment
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome {userInfo.name}! Let's calculate your potential savings with AI implementation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <AssessmentSection
              key={section.id}
              {...section}
              value={values[section.id as keyof typeof values]}
              additionalValues={section.additionalInputs?.reduce((acc, input) => ({
                ...acc,
                [input.id]: values[input.id as keyof typeof values]
              }), {})}
              onChange={handleInputChange}
            />
          ))}
        </div>

        <div className="text-center space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 inline-block">
            <h2 className="text-2xl font-bold mb-2">
              Total Potential Annual Savings:
              <span className="ml-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                ${calculateTotalSavings().toLocaleString()}
              </span>
            </h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Book a FREE AI Audit
          </button>
        </div>
      </motion.div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="tidycal-embed" data-path="mani/ai-audit"></div>
            <script src="https://asset-tidycal.b-cdn.net/js/embed.js" async></script>
          </div>
        </div>
      )}
    </div>
  );
}