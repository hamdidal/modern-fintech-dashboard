import type { UseFormRegister, FieldError } from "react-hook-form";
import { useMemo } from "react";
import styles from "@styles/auth.module.scss";

type FormValues = {
  fullName?: string;
  email: string;
  password: string;
};

type FormFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FormValues>;    
};

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  error,
  disabled,
  required,
  register,
}: FormFieldProps) {
  const inputId = useMemo(() => `field-${name}`, [name]);
  const errorId = useMemo(() => `${inputId}-error`, [inputId]);

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className="label">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        className={`input ${error ? "input--error" : ""}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        {...register(name as keyof typeof register)}
      />
      {error && (
        <div 
          id={errorId}
          className={`helper ${styles.error}`}
          role="alert"
        >
          {String(error.message)}
        </div>
      )}
    </div>
  );
}

