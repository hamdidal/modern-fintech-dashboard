import React from "react";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import type { WithTranslation } from "react-i18next";
import styles from "@styles/error-boundary.module.scss";
import DangerSign from "@assets/icons/danger-sign.png";

type State = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

type Props = React.PropsWithChildren<{
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}> &
  WithTranslation;

class ErrorBoundaryComponent extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {

    this.setState({ errorInfo });

    this.props.onError?.(error, errorInfo);

    const { t } = this.props;
    toast.error(t("errorBoundary.toastMessage"));

    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
    if (import.meta.env.PROD) {
      console.error("Error logged to service:", { error, errorInfo });
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo } = this.state;
      const { t } = this.props;

      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorCard}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>
                <img className={styles.dangerSign} src={DangerSign} />
              </span>
            </div>

            <h1 className={styles.title}>{t("errorBoundary.title")}</h1>
            <p className={styles.message}>{t("errorBoundary.message")}</p>

            {error && (
              <div className={styles.errorDetails}>
                <div className={styles.errorDetailsTitle}>
                  {t("errorBoundary.detailsTitle")}
                </div>
                <pre className={styles.errorDetailsCode}>
                  <strong>{t("errorBoundary.errorMessage")}:</strong>{" "}
                  {error.message}
                  {"\n\n"}
                  <strong>{t("errorBoundary.stackTrace")}:</strong>
                  {"\n"}
                  {error.stack}
                  {errorInfo?.componentStack && (
                    <>
                      {"\n\n"}
                      <strong>{t("errorBoundary.componentStack")}:</strong>
                      {"\n"}
                      {errorInfo.componentStack}
                    </>
                  )}
                </pre>
              </div>
            )}

            <div className={styles.actions}>
              <button className={styles.btnPrimary} onClick={this.handleReload}>
                {t("errorBoundary.reloadButton")}
              </button>
              <button
                className={styles.btnSecondary}
                onClick={this.handleGoHome}
              >
                {t("errorBoundary.homeButton")}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryComponent);
