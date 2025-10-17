import { useState } from "react";
import { type ScheduledTransfers } from "@api/finance";
import { useTranslation } from "react-i18next";
import { formatDate } from "@utils/format";
import { useCurrency } from "@hooks/useCurrency";
import { getAvatarForTransfer } from "@utils/avatars";

export default function ScheduledTransfers({
  scheduledTransfers,
}: {
  scheduledTransfers: ScheduledTransfers | undefined;
}) {
  const { t } = useTranslation();
  const { convertAndFormat } = useCurrency();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!scheduledTransfers) return null;

  const displayedTransfers = scheduledTransfers.transfers.slice(0, 5);

  const handleViewAll = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="scheduled-transfers">
        <div className="scheduled-transfers__header">
          <h3 className="scheduled-transfers__title">
            {t("app.scheduledTransfers")}
          </h3>
          <button
            className="scheduled-transfers__view-all"
            onClick={handleViewAll}
          >
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

        <div className="scheduled-transfers__list">
          {displayedTransfers.map((transfer) => (
            <div key={transfer.id} className="scheduled-transfers__item">
              <div className="scheduled-transfers__user">
                <div className="scheduled-transfers__avatar">
                  <img
                    src={getAvatarForTransfer(transfer.id)}
                    alt={transfer.name}
                  />
                </div>
                <div className="scheduled-transfers__info">
                  <div className="scheduled-transfers__name">
                    {transfer.name}
                  </div>
                  <div className="scheduled-transfers__date">
                    {formatDate(transfer.date)}
                  </div>
                </div>
              </div>
              <div className="scheduled-transfers__amount">
                {convertAndFormat(-transfer.amount, transfer.currency)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="transfers-modal-overlay" onClick={handleCloseModal}>
          <div className="transfers-modal" onClick={(e) => e.stopPropagation()}>
            <div className="transfers-modal__header">
              <h2>{t("app.scheduledTransfers")}</h2>
              <button
                className="transfers-modal__close"
                onClick={handleCloseModal}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="transfers-modal__content">
              <div className="scheduled-transfers__list">
                {scheduledTransfers.transfers.map((transfer) => (
                  <div key={transfer.id} className="scheduled-transfers__item">
                    <div className="scheduled-transfers__user">
                      <div className="scheduled-transfers__avatar">
                        <img
                          src={getAvatarForTransfer(transfer.id)}
                          alt={transfer.name}
                        />
                      </div>
                      <div className="scheduled-transfers__info">
                        <div className="scheduled-transfers__name">
                          {transfer.name}
                        </div>
                        <div className="scheduled-transfers__date">
                          {formatDate(transfer.date)}
                        </div>
                      </div>
                    </div>
                    <div className="scheduled-transfers__amount">
                      {convertAndFormat(-transfer.amount, transfer.currency)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
