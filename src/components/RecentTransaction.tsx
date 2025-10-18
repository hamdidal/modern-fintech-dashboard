import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "@utils/format";
import { useCurrency } from "@hooks/useCurrency";
import type { RecentTransactions } from "@api/finance";
import { ArrowRightIcon } from "@assets/svgs/ArrowRight";
import Modal from "./Modal";

export default function RecentTransaction({ recentTransactions }: { recentTransactions: RecentTransactions }) {
  const { t } = useTranslation();
  const { convertAndFormat } = useCurrency();
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
            <ArrowRightIcon />
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
                    {convertAndFormat(transaction.amount, transaction.currency)}
                  </td>
                  <td className="recent-transaction__date">{formatDate(transaction.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t("app.recentTransaction")}
        maxWidth="900px"
      >
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
              {recentTransactions.transactions.map((transaction) => (
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
                    {convertAndFormat(transaction.amount, transaction.currency)}
                  </td>
                  <td className="recent-transaction__date">{formatDate(transaction.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
}
