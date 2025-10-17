import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@store/auth.store";
import { useCurrencyStore } from "@store/currency.store";
import { useTranslation } from "react-i18next";
import type { Currency } from "../types/common.types";
import searchIcon from "@assets/icons/search.png";
import notificationIcon from "@assets/icons/notification.png";
import profileIcon from "@assets/profile-pictures/picture.png";
import arrowDownIcon from "@assets/dropdown.png";
import settingsIcon from "@assets/icons/settings.png";
import logo from "@assets/logo.png";
import menuIcon from "@assets/icons/menu-icon.png";

interface HeaderProps {
  onMenuClick: () => void;
  isTablet: boolean;
  showHamburger: boolean;
}

export default function Header({
  onMenuClick,
  isTablet,
  showHamburger,
}: HeaderProps) {
  const { t, i18n } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const { currency, setCurrency } = useCurrencyStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 1,
      title: "Payment Received",
      message: "You received $250.00",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "New Invoice",
      message: "Invoice #1234 has been created",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Transfer Completed",
      message: "Transfer to John Doe completed",
      time: "3 hours ago",
      unread: false,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const handleCurrencyChange = (currencyCode: Currency) => {
    setCurrency(currencyCode);
  };

  const renderLanguageButton = (langCode: string, labelKey: string) => (
    <button
      key={langCode}
      className={i18n.language === langCode ? "active" : ""}
      onClick={() => handleLanguageChange(langCode)}
    >
      {t(labelKey)}
    </button>
  );

  const renderCurrencyButton = (currencyCode: Currency) => (
    <button
      key={currencyCode}
      className={currency === currencyCode ? "active" : ""}
      onClick={() => handleCurrencyChange(currencyCode)}
    >
      {currencyCode}
    </button>
  );

  return (
    <header className="header">
      <div className="header__left">
        {showHamburger && (
          <div className="header__left-mobile">
            <button className="header__hamburger" onClick={onMenuClick}>
              <img src={menuIcon} alt="Menu" />
            </button>
            <img src={logo} alt="Maglo" className="header__logo" />
          </div>
        )}
        {!showHamburger && (
          <h1 className="header__title">{t("app.dashboard")}</h1>
        )}
      </div>

      <div className="header__actions">
        <div className="header__search-wrapper" ref={searchRef}>
          {!isTablet && !showSearch ? (
            <button
              className="header__search-icon-btn"
              onClick={() => setShowSearch(true)}
            >
              <img src={searchIcon} alt="Search" />
            </button>
          ) : !isTablet && showSearch ? (
            <div className="header__search">
              <input
                type="text"
                className="header__search-input"
                placeholder={t("app.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button className="header__search-btn" disabled>
                <img src={searchIcon} alt="Search" />
              </button>
            </div>
          ) : (
            <>
              <button
                className="header__search-icon-btn"
                onClick={() => setShowSearch(!showSearch)}
              >
                <img src={searchIcon} alt="Search" />
              </button>
              {showSearch && (
                <div className="header__search-popup header__search-popup--mobile">
                  <div className="header__search header__search--popup">
                    <input
                      type="text"
                      className="header__search-input"
                      placeholder={t("app.search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button className="header__search-btn" disabled>
                      <img src={searchIcon} alt="Search" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="header__notification-wrapper" ref={notificationRef}>
          <button
            className="header__notification"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="header__notification-icon">
              <img src={notificationIcon} alt="Notification" />
            </span>
            <span className="header__notification-badge">3</span>
          </button>

          {showNotifications && (
            <div className="header__notification-popup">
              <div className="header__notification-header">
                <h3>Notifications</h3>
                <button className="header__notification-clear">
                  Mark all as read
                </button>
              </div>
              <div className="header__notification-list">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`header__notification-item ${
                      notif.unread ? "unread" : ""
                    }`}
                  >
                    <div className="header__notification-content">
                      <div className="header__notification-title">
                        {notif.title}
                      </div>
                      <div className="header__notification-message">
                        {notif.message}
                      </div>
                    </div>
                    <div className="header__notification-time">
                      {notif.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="header__user-wrapper" ref={userMenuRef}>
          <div
            className="header__user"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="header__user-avatar">
              <img src={profileIcon} alt="Profile" />
            </div>
            {!showHamburger && (
              <>
                <span className="header__user-name">
                  {user?.fullName || "User"}
                </span>
                <span className="header__user-arrow">
                  <img src={arrowDownIcon} alt="Arrow Down" />
                </span>
              </>
            )}
          </div>

          {showUserMenu && (
            <div className="header__user-menu">
              <button
                className="header__user-menu-item header__user-menu-item--disabled"
                disabled
              >
                <span>
                  <img
                    className="header__user-menu-item-profile-icon"
                    src={profileIcon}
                    alt="Profile"
                  />
                </span>
                <span>{t("app.profile")}</span>
              </button>
              <button
                className="header__user-menu-item header__user-menu-item--disabled"
                disabled
              >
                <span>
                  <img src={settingsIcon} alt="Settings" />
                </span>
                <span>{t("app.settings")}</span>
              </button>
              <div className="header__user-menu-divider" />
              <div className="header__user-menu-lang">
                {renderLanguageButton("en", "app.english")}
                {renderLanguageButton("tr", "app.turkish")}
              </div>
              <div className="header__user-menu-divider" />
              <div className="header__user-menu-lang">
                {renderCurrencyButton("TRY")}
                {renderCurrencyButton("USD")}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
