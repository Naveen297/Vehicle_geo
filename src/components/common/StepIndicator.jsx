/**
 * StepIndicator Component
 * Displays step-by-step progress indicators
 */
const StepIndicator = ({ step, title, variant = 'info' }) => {
  const variants = {
    info: {
      border: 'border-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      badge: 'bg-blue-500',
      text: 'text-blue-700 dark:text-blue-300',
    },
    success: {
      border: 'border-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
      badge: 'bg-green-500',
      text: 'text-green-700 dark:text-green-300',
    },
    primary: {
      border: 'border-mahindra-red',
      bg: 'bg-mahindra-red/5 dark:bg-mahindra-red/10',
      badge: 'bg-mahindra-red',
      text: 'text-mahindra-red-dark dark:text-mahindra-red-light',
    },
  };

  const styles = variants[variant] || variants.info;

  return (
    <div className={`flex items-center p-3 border-l-4 ${styles.border} rounded-lg ${styles.bg}`}>
      <div className={`flex items-center justify-center w-8 h-8 mr-3 text-white rounded-full ${styles.badge}`}>
        <span className="font-bold">{step}</span>
      </div>
      <p className={`text-sm font-semibold ${styles.text}`}>{title}</p>
    </div>
  );
};

export default StepIndicator;
