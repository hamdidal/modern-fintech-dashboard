import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import FormField from "./FormField";

const schema = (t: TFunction, mode: "signin" | "signup") => {
  const baseSchema = {
    email: z.string().email(t("validation.email")),
    password:
      mode === "signup"
        ? z
            .string()
            .min(8, t("validation.passwordMin"))
            .regex(/[A-Z]/, t("validation.passwordUppercase"))
            .regex(
              /[!@#$%^&*(),.?":{}|<>]/,
              t("validation.passwordSpecialChar")
            )
            .regex(/[0-9]/, t("validation.passwordNumber"))
        : z.string().min(1, t("validation.required")),
  };

  if (mode === "signup") {
    return z.object({
      ...baseSchema,
      fullName: z.string().min(2, t("validation.fullnameMin")),
    });
  } else {
    return z.object(baseSchema);
  }
};

type FormValues = {
  fullName?: string;
  email: string;
  password: string;
};

type Props = {
  mode: "signin" | "signup";
  onSubmit: (values: FormValues) => Promise<void> | void;
  loading?: boolean;
};

export default function AuthForm({ mode, onSubmit, loading }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema(t, mode)),
    mode: "onChange",
    defaultValues:
      mode === "signup"
        ? { fullName: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const showName = mode === "signup";

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
      onSubmit={handleSubmit(handleFormSubmit)}
      aria-busy={loading}
    >
      {showName && (
        <FormField
          label={t("app.fullName")}
          name="fullName"
          placeholder={t("app.fullName")!}
          error={errors.fullName}
          disabled={loading}
          required
          register={register}
        />
      )}

      <FormField
        label={t("app.email")}
        name="email"
        type="email"
        placeholder="example@gmail.com"
        error={errors.email}
        disabled={loading}
        required
        register={register}
      />

      <FormField
        label={t("app.password")}
        name="password"
        type="password"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        error={errors.password}
        disabled={loading}
        required
        register={register}
      />

      <button type="submit" className="btn" disabled={loading || !isValid}>
        {loading
          ? t("app.loading")
          : mode === "signin"
          ? t("app.signIn")
          : t("app.signUp")}
      </button>
    </form>
  );
}
