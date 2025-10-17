import { useEffect, useState } from "react";
import { useAuthStore } from "@store/auth.store";
import { signIn } from "@api/auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "@styles/auth.module.scss";
import AuthForm from "@components/AuthForm";
import { useScreenSize } from "@hooks/useScreenSize"; 
import logo from "@assets/logo.png";
import google from "@assets/icons/google-icon.png";
import signUpVector from "@assets/sign-up-vector.png";
import { useNavigate } from "react-router-dom";
import Spinner from "@components/Spinner";

export default function SignIn() {
  const { t } = useTranslation();
  const token = useAuthStore((s) => s.token);
  const setAuth = useAuthStore((s) => s.setAuth);
  const [loading, setLoading] = useState(false);
  const { isTablet } = useScreenSize();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      location.replace("/");
    }
  }, [token]);

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await signIn(values.email, values.password);
      setAuth({
        token: response.data.accessToken,
        user: response.data.user,
      });
      toast.success(t("app.signedIn"));
      location.replace("/");
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An error occurred'
      if (errorMessage.toLowerCase().includes("invalid"))
        toast.warning(t("app.invalidCreds"));
      else toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async () => {
      try {
        setLoading(true);
        toast.info(t("app.googleAuthPending") || "Google authentication will be available soon!");
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error'
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error(t("app.googleAuthError") || "Google authentication failed");
    },
  });

  return (
    <div className={styles.wrapper}>
      <div className={!isTablet ? styles.container : styles.containerTablet}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.left}>
          <div className={styles.form}>
            {loading && (
              <div className={styles.loadingOverlay}>
                <Spinner size="large" />
              </div>
            )}
            <div className={styles.headerSection}>
              <p className={styles.title}>{t("app.signIn")}</p>
              <p className={styles.subtitle}>{t("app.welcomeBack")}</p>
            </div>
            <AuthForm mode="signin" onSubmit={onSubmit} loading={loading} />
            <div className={styles.socialSection}>
              <button 
                className="btn-google" 
                onClick={() => handleGoogleLogin()}
                disabled
                type="button"
              >
                <img src={google} alt="google" />
                <p className={styles.googleButtonText}>
                  {t("app.signInWithGoogle")}
                </p>
              </button>
              <p className={styles.footerLink} onClick={() => navigate("/signup")}>
                <span className={styles.linkLabel}>{t("app.noAccount")}</span>
                <span className={styles.linkText}>
                  {t("app.signUp")}
                  <img src={signUpVector} alt="sign up" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {!isTablet && <div className={styles.right} aria-hidden />}
    </div>
  );
}
