import { useState } from "react";
import { type ScheduledTransfers } from "@api/finance";
import { useTranslation } from "react-i18next";
import { formatDate } from "@utils/format";
import { useCurrency } from "@hooks/useCurrency";
import { getAvatarForTransfer } from "@utils/avatars";
import { ArrowRightIcon } from "@assets/svgs/ArrowRight";
import Modal from "./Modal";

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
            <ArrowRightIcon />
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t("app.scheduledTransfers")}
        maxWidth="600px"
      >
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
      </Modal>
    </>
  );
}
