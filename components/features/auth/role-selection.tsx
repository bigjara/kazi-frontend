'use client';

import React from 'react';
import { Users, Briefcase, CheckCircle2, ArrowRight, HelpCircle, Shield, Zap, Target  } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useOnboarding, RoleType } from '@/contexts/OnboardingContext';

interface StatCardProps {
  value: string;
  label: string;
  color: string;
}

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
  badge?: string;
}

interface RoleCardProps {
  type: RoleType;
  selected: boolean;
  onSelect: (type: RoleType) => void;
  onGetStarted: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  stats: StatCardProps[];
  features: FeatureItemProps[];
  buttonText: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => {
  const bgColorMap: Record<string, string> = {
    'text-purple-600': 'bg-purple-50',
    'text-orange-500': 'bg-orange-50',
    'text-green-600': 'bg-green-50'
  };
  
  return (
    <div className={`text-center p-3 rounded-lg ${bgColorMap[color] || 'bg-gray-50'}`}>
      <div className={`text-xl font-bold ${color} mb-0.5`}>{value}</div>
      <div className="text-xs text-gray-600 font-medium">{label}</div>
    </div>
  );
};

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text, badge }) => (
  <div className="flex items-center gap-3 py-2.5">
    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center text-white">
      {icon}
    </div>
    <span className="text-sm text-gray-700 flex-1">{text}</span>
    {badge && (
      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
        {badge}
      </span>
    )}
  </div>
);

const RoleCard: React.FC<RoleCardProps> = ({
  type,
  selected,
  onSelect,
  onGetStarted,
  icon,
  title,
  subtitle,
  description,
  stats,
  features,
  buttonText
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onSelect(type);
  };

  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
        selected
          ? 'bg-blue-50 border-2 border-blue-400 shadow-lg'
          : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={handleCardClick}
    >
      {selected && (
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-10">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
      )}

      <div className="flex items-start gap-3 mb-4">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
          selected ? 'bg-blue-600' : 'bg-gray-900'
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        {description}
      </p>

      <div className="grid grid-cols-3 gap-2 mb-5">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white">
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onGetStarted();
        }}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
          selected
            ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </button>

      {selected && (
        <div className="text-center mt-3">
          <p className="text-xs text-blue-700 font-medium">
            You&apos;ve selected {title}
          </p>
        </div>
      )}
    </div>
  );
};

export default function RoleSelection() {
  const router = useRouter();
  const { selectedRole, setSelectedRole } = useOnboarding();

  const handleGetStarted = (role: RoleType) => {
    setSelectedRole(role);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role || '');
    }
    
    const dashboardRoute = role === 'creator' 
      ? '/dashboard/creator' 
      : '/dashboard/fulfiller';
    
    router.push(dashboardRoute);
  };

  const creatorData = {
    type: 'creator' as RoleType,
    icon: <Briefcase className="w-5 h-5 text-white" />,
    title: 'Task Creator',
    subtitle: 'Post tasks and find the right talent',
    description: 'Whether you\'re recruiting professionals, finding delivery riders, hiring security personnel, sourcing service providers across any industry - post your task and connect with verified talent ready to deliver.',
    stats: [
      { value: '10x', label: 'Faster hiring', color: 'text-purple-600' },
      { value: '95%', label: 'Match accuracy', color: 'text-orange-500' },
      { value: '20+', label: 'Industries supported', color: 'text-green-600' }
    ],
    features: [
      { icon: <Target  className="w-4 h-4" />, text: 'AI-powered candidate matching', badge: 'Premium' },
      { icon: <Shield       className="w-4 h-4" />, text: 'Verified professionals only' },
      { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Advanced screening and assessment' }
    ],
    buttonText: 'Get Started'
  };

  const fulfillerData = {
    type: 'fulfiller' as RoleType,
    icon: <Users className="w-5 h-5 text-white" />,
    title: 'Task Fulfiller',
    subtitle: 'Discover and complete tasks',
    description: 'Find opportunities that match your skills and availability. Whether you\'re a professional seeking projects, a rider offering delivery services, or an expert in your field - discover tasks and get hired instantly.',
    stats: [
      { value: '10x', label: 'Faster task matching', color: 'text-purple-600' },
      { value: '95%', label: 'Success rate', color: 'text-orange-500' },
      { value: '20+', label: 'Task categories', color: 'text-green-600' }
    ],
    features: [
      { icon: <Zap  className="w-4 h-4 " />, text: 'Instant task matching', badge: 'Premium' },
      { icon: <Shield className="w-4 h-4" />, text: 'Professional profile builder' },
      { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Personalized recommendations' }
    ],
    buttonText: 'Explore Tasks'
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-10 lg:mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-6">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Choose Your Journey
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of professionals who trust KAZI to connect, collaborate,
          and complete tasks across industries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
        <RoleCard
          {...creatorData}
          selected={selectedRole === 'creator'}
          onSelect={setSelectedRole}
          onGetStarted={() => handleGetStarted('creator')}
        />
        <RoleCard
          {...fulfillerData}
          selected={selectedRole === 'fulfiller'}
          onSelect={setSelectedRole}
          onGetStarted={() => handleGetStarted('fulfiller')}
        />
      </div>

      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need help deciding?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Learn more about our platform and find the path that&apos;s right for your goals.
            </p>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}