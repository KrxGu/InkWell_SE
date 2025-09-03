import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Languages, Zap, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TranslationStatsProps {
  jobCount?: number;
  averageTime?: number; // in seconds
  supportedLanguages?: number;
  accuracy?: number; // percentage
  className?: string;
}

export function TranslationStats({
  jobCount = 1247,
  averageTime = 45,
  supportedLanguages = 109,
  accuracy = 99.2,
  className
}: TranslationStatsProps) {
  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const stats = [
    {
      label: 'Documents Translated',
      value: jobCount.toLocaleString(),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12% this week'
    },
    {
      label: 'Average Processing Time',
      value: formatTime(averageTime),
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '-8% faster'
    },
    {
      label: 'Supported Languages',
      value: supportedLanguages.toString(),
      icon: Languages,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+3 new languages'
    },
    {
      label: 'Translation Accuracy',
      value: `${accuracy}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+0.3% improvement'
    }
  ];

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-4 border-0 shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.bgColor)}>
                <Icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <Badge variant="secondary" className="text-xs">
                {stat.change}
              </Badge>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

interface RecentActivityProps {
  className?: string;
}

export function RecentActivity({ className }: RecentActivityProps) {
  const activities = [
    {
      action: 'PDF translated',
      document: 'Annual Report 2024.pdf',
      languages: 'EN → ES',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      action: 'PDF translated',
      document: 'Technical Manual.pdf', 
      languages: 'EN → FR',
      time: '5 minutes ago',
      status: 'completed'
    },
    {
      action: 'PDF processing',
      document: 'Research Paper.pdf',
      languages: 'EN → DE',
      time: '8 minutes ago',
      status: 'processing'
    },
    {
      action: 'PDF translated',
      document: 'Marketing Brochure.pdf',
      languages: 'EN → JA',
      time: '12 minutes ago',
      status: 'completed'
    }
  ];

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900">{activity.document}</p>
              <p className="text-xs text-gray-500">
                {activity.action} • {activity.languages}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                variant={activity.status === 'completed' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {activity.status}
              </Badge>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
