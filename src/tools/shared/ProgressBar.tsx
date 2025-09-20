import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current?: boolean;
}

interface ProgressBarProps {
  steps: ProgressStep[];
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  showIcons?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  orientation = 'horizontal',
  showLabels = true,
  showIcons = true
}) => {
  const getStepIcon = (step: ProgressStep) => {
    if (!showIcons) return null;
    
    if (step.completed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (step.current) {
      return <Clock className="w-5 h-5 text-blue-500" />;
    } else {
      return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepColor = (step: ProgressStep) => {
    if (step.completed) return 'text-green-600';
    if (step.current) return 'text-blue-600';
    return 'text-gray-500';
  };

  if (orientation === 'vertical') {
    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              {getStepIcon(step)}
              {index < steps.length - 1 && (
                <div className={`w-0.5 h-8 mt-2 ${
                  step.completed ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
            <div className="flex-1">
              <div className={`font-medium ${getStepColor(step)}`}>
                {step.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStepIcon(step)}
              {showLabels && (
                <span className={`text-sm font-medium ${getStepColor(step)}`}>
                  {step.label}
                </span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-full h-0.5 ${
                step.completed ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;