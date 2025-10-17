import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatCurrency, formatDate } from "@utils/format";
import type { RecentTransactions } from "@api/finance";

export default function RecentTransaction({ recentTransactions }: { recentTransactions: RecentTransactions }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedTransactions = recentTransactions.transactions.slice(0, 3);

  const handleViewAll = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="recent-transaction">
        <div className="recent-transaction__header">
          <h3>{t("app.recentTransaction")}</h3>
          <button className="recent-transaction__view-all" onClick={handleViewAll}>
            {t("app.viewAll")}{" "}
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.442382 1.5575L3.87738 5L0.442383 8.4425L1.49988 9.5L5.99988 5L1.49988 0.5L0.442382 1.5575Z"
                fill="#29A073"
              />
            </svg>
          </button>
        </div>

        <div className="recent-transaction__table">
          <table>
            <thead>
              <tr>
                <th>{t("app.nameBusiness")}</th>
                <th>{t("app.type")}</th>
                <th>{t("app.amount")}</th>
                <th>{t("app.date")}</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <div className="recent-transaction__name-cell">
                      <div className="recent-transaction__icon">
                        <img className="recent-transaction__icon-image" src={transaction.image} alt={transaction.name} />
                      </div>
                      <div className="recent-transaction__name-info">
                        <div className="recent-transaction__name">
                          {transaction.name}
                        </div>
                        <div className="recent-transaction__business">
                          {transaction.business}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="recent-transaction__type">{transaction.type}</td>
                  <td className="recent-transaction__amount">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </td>
                  <td className="recent-transaction__date">{formatDate(transaction.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="transaction-modal-overlay" onClick={handleCloseModal}>
          <div className="transaction-modal" onClick={(e) => e.stopPropagation()}>
            <div className="transaction-modal__header">
              <h2>{t("app.recentTransaction")}</h2>
              <button className="transaction-modal__close" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="transaction-modal__content">
              <table>
                <thead>
                  <tr>
                    <th>{t("app.nameBusiness")}</th>
                    <th>{t("app.type")}</th>
                    <th>{t("app.amount")}</th>
                    <th>{t("app.date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <div className="recent-transaction__name-cell">
                          <div className="recent-transaction__icon">
                            <img src={transaction.image} alt={transaction.name} />
                          </div>
                          <div className="recent-transaction__name-info">
                            <div className="recent-transaction__name">
                              {transaction.name}
                            </div>
                            <div className="recent-transaction__business">
                              {transaction.business}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="recent-transaction__type">{transaction.type}</td>
                      <td className="recent-transaction__amount">
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </td>
                      <td className="recent-transaction__date">{formatDate(transaction.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
