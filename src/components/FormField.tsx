import type { UseFormRegister, FieldError } from "react-hook-form";

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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label className="label">{label}</label>
      <input
        type={type}
        className={`input ${error ? "input--error" : ""}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...register(name as keyof typeof register)}
      />
      {error && (
        <div className="helper" style={{ color: "var(--danger)" }}>
          {String(error.message)}
        </div>
      )}
    </div>
  );
}

