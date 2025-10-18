import { type Wallet } from "@api/finance";
import { useTranslation } from "react-i18next";
import VisaIcon from "@assets/icons/visa.png";
import MastercardIcon from "@assets/icons/mastercard.png";
import CardChip from "@assets/svgs/CardChip";
import WifiSymbol from "@assets/svgs/WifiSymbol";

export default function WalletCard({ wallet }: { wallet: Wallet }) {
  const { t } = useTranslation();

  const maskCardNumber = (cardNumber: string, index: number) => {
    if (index === 0) return cardNumber;
    const cleaned = cardNumber.replace(/\s/g, "");
    const visible = cleaned.substring(0, 8);
    return `${visible.substring(0, 4)} ${visible.substring(4, 8)}****`;
  };

  if (!wallet) return null;

  return (
    <div className="wallet-card">
      <div className="wallet-card__header">
        <h3 className="wallet-card__title">{t("app.wallet")}</h3>
        <button className="wallet-card__more">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3210_423)">
              <path
                d="M4.50008 9.16666C3.48716 9.16666 2.66675 9.98708 2.66675 11C2.66675 12.0129 3.48716 12.8333 4.50008 12.8333C5.513 12.8333 6.33341 12.0129 6.33341 11C6.33341 9.98708 5.513 9.16666 4.50008 9.16666ZM17.5001 9.16666C16.4872 9.16666 15.6667 9.98708 15.6667 11C15.6667 12.0129 16.4872 12.8333 17.5001 12.8333C18.513 12.8333 19.3334 12.0129 19.3334 11C19.3334 9.98708 18.513 9.16666 17.5001 9.16666ZM11.0001 9.16666C9.98716 9.16666 9.16675 9.98708 9.16675 11C9.16675 12.0129 9.98716 12.8333 11.0001 12.8333C12.013 12.8333 12.8334 12.0129 12.8334 11C12.8334 9.98708 12.013 9.16666 11.0001 9.16666Z"
                fill="#929EAE"
              />
            </g>
            <defs>
              <clipPath id="clip0_3210_423">
                <rect width="22" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      <div className="wallet-card__cards">
        {wallet.cards.map((card, index) => (
          <div key={index} className="wallet-card__item">
            {index === 1 && <div className="wallet-card__overlay" />}

            <div className="wallet-card__bank">
              <span className="wallet-card__bank-name">
                {card.bank.split(" ")[0]}.
              </span>
              <span className="wallet-card__bank-name_last">
                {card.bank.slice(card.bank.split(" ")[0].length + 1)}
              </span>
            </div>

            <div className="wallet-card__chip">
              <CardChip index={index} />
              <WifiSymbol index={index} />
            </div>

            <div className="wallet-card__number">
              {maskCardNumber(card.cardNumber, index)}
            </div>

            <div className="wallet-card__footer">
              <div className="wallet-card__expiry">
                {card.expiryMonth}/{card.expiryYear}
              </div>
              <div className="wallet-card__brand">
                {card.network === "Visa" ? (
                  <img src={VisaIcon} alt="Visa" />
                ) : (
                  <img src={MastercardIcon} alt="Mastercard" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
