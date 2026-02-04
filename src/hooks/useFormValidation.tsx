'use client'

import { useState, useCallback } from 'react';

interface UseFormValidationReturn {
  isChecked: boolean;
  isError: boolean;
  setIsChecked: (checked: boolean) => void;
  setIsError: (error: boolean) => void;
  validate: () => boolean;
  reset: () => void;
}

export const useFormValidation = (): UseFormValidationReturn => {
  const [isChecked, setIsCheckedState] = useState(false);
  const [isError, setIsErrorState] = useState(false);

  const setIsChecked = useCallback((checked: boolean) => {
    setIsCheckedState(checked);
    if (checked && isError) {
      setIsErrorState(false);
    }
  }, [isError]);

  const setIsError = useCallback((error: boolean) => {
    setIsErrorState(error);
  }, []);

  const validate = useCallback((): boolean => {
    const isValid = isChecked;
    setIsErrorState(!isValid);
    return isValid;
  }, [isChecked]);

  const reset = useCallback(() => {
    setIsCheckedState(false);
    setIsErrorState(false);
  }, []);

  return {
    isChecked,
    isError,
    setIsChecked,
    setIsError,
    validate,
    reset
  };
};