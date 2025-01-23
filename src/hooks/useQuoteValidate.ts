import { useState } from "react";

interface InitialValuesProps {
  price: string;
  message: string;
}

interface Errors {
  price?: string;
  message?: string;
}

export default function useQuoteValidate(initialValues: InitialValuesProps) {
  const [values, setValues] = useState<InitialValuesProps>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    let isValid = true;
    let newError: Errors = {};

    if (!values.price || values.price.length < 1 || isNaN(parseInt(values.price))) {
      isValid = false;
      newError.price = "숫자로 입력해주세요";
    }

    if (!values.message || values.message.length < 10) {
      isValid = false;
      newError.message = "최소 10자 이상 입력해주세요.";
    }

    setErrors(newError);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  const isInputEmpty = (): boolean => {
    return values.price.trim() === "" || values.message.trim() === "";
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    validate,
    handleChange,
    isInputEmpty,
  };
}
