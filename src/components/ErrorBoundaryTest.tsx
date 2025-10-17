import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "@styles/error-boundary.module.scss";

export const ErrorBoundaryTest = () => {
  const { t } = useTranslation();
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error(t("errorBoundary.testErrorMessage"));
  }

  return (
    <div
    className={styles.errorBoundaryTest}
      onClick={() => setShouldThrow(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setShouldThrow(true);
        }
      }}
    >
      {t("errorBoundary.testButton")}
    </div>
  );
};