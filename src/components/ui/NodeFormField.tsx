import type { UseFormRegisterReturn } from 'react-hook-form';
import { AlertTriangle } from 'lucide-react';

interface NodeFormFieldProps {
  registration: UseFormRegisterReturn;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  as?: 'input' | 'textarea';
  rows?: number;
  label?: string;
  className?: string;
}

const base =
  'w-full text-sm bg-white dark:bg-black border rounded-lg p-2.5 focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500';
const ok  = 'border-gray-200 dark:border-[#1a1a1a] focus:ring-[#1C8D73]/30 focus:border-[#1C8D73]';
const err = 'border-red-400/60 dark:border-red-500/40 focus:ring-red-400/20 focus:border-red-400 pr-8';

export function NodeFormField({
  registration,
  onValueChange,
  placeholder,
  error,
  as = 'input',
  rows = 3,
  label,
  className = '',
}: NodeFormFieldProps) {
  const { onChange: rhfOnChange, ...rest } = registration;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    rhfOnChange(e);
    onValueChange(e.target.value);
  };

  const fieldClass = `${base} ${error ? err : ok} ${as === 'textarea' ? 'resize-none' : ''} ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {label}
        </p>
      )}
      <div className="relative">
        {as === 'textarea' ? (
          <textarea
            {...rest}
            onChange={handleChange}
            placeholder={placeholder}
            rows={rows}
            className={fieldClass}
          />
        ) : (
          <input
            type="text"
            {...rest}
            onChange={handleChange}
            placeholder={placeholder}
            className={fieldClass}
          />
        )}
        {error && (
          <AlertTriangle className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-red-400 pointer-events-none" />
        )}
      </div>
      {error && (
        <p className="text-[10px] text-red-400 font-medium flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}
