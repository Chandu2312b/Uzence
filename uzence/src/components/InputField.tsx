import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export interface InputFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  className?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: (value: string) => void;
  validation?: {
    min?: number;
    max?: number;
    custom?: (value: string) => string | null;
  };
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  required = false,
  disabled = false,
  error,
  helperText,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  className = '',
  onChange,
  onBlur,
  onFocus,
  validation,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [internalError, setInternalError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const currentValue = value !== undefined ? value : internalValue;
  const currentError = error || internalError;

  useEffect(() => {
    if (currentValue) {
      validateInput(currentValue);
    }
  }, [currentValue]);

  const validateInput = (val: string) => {
    if (!val && required) {
      setInternalError('This field is required');
      setIsValid(false);
      return;
    }

    if (val && minLength && val.length < minLength) {
      setInternalError(`Minimum ${minLength} characters required`);
      setIsValid(false);
      return;
    }

    if (val && maxLength && val.length > maxLength) {
      setInternalError(`Maximum ${maxLength} characters allowed`);
      setIsValid(false);
      return;
    }

    if (val && type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setInternalError('Please enter a valid email address');
        setIsValid(false);
        return;
      }
    }

    if (val && type === 'url') {
      const urlRegex = /^https?:\/\/.+\..+/;
      if (!urlRegex.test(val)) {
        setInternalError('Please enter a valid URL');
        setIsValid(false);
        return;
      }
    }

    if (val && validation?.min && parseFloat(val) < validation.min) {
      setInternalError(`Value must be at least ${validation.min}`);
      setIsValid(false);
      return;
    }

    if (val && validation?.max && parseFloat(val) > validation.max) {
      setInternalError(`Value must be no more than ${validation.max}`);
      setIsValid(false);
      return;
    }

    if (val && validation?.custom) {
      const customError = validation.custom(val);
      if (customError) {
        setInternalError(customError);
        setIsValid(false);
        return;
      }
    }

    setInternalError(null);
    setIsValid(val.length > 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    validateInput(newValue);
    onChange?.(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    const val = e.target.value;
    validateInput(val);
    onBlur?.(val);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e.target.value);
  };

  const inputClasses = `
    w-full px-4 py-3 text-gray-900 placeholder-gray-500 border rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${currentError ? 'border-red-500 bg-red-50' : 
      isValid ? 'border-green-500 bg-green-50' :
      isFocused ? 'border-blue-500 bg-blue-50' : 
      'border-gray-300 bg-white hover:border-gray-400'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
    ${type === 'password' ? 'pr-12' : ''}
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={inputClasses}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        
        {currentError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle size={20} className="text-red-500" />
          </div>
        )}
        
        {isValid && !currentError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <CheckCircle size={20} className="text-green-500" />
          </div>
        )}
      </div>
      
      {(currentError || helperText) && (
        <div className="flex items-center space-x-1">
          {currentError ? (
            <>
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{currentError}</p>
            </>
          ) : (
            <p className="text-sm text-gray-600 ml-5">{helperText}</p>
          )}
        </div>
      )}
      
      {maxLength && (
        <div className="text-right">
          <span className={`text-xs ${
            currentValue.length > maxLength * 0.9 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {currentValue.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputField;