import { useTranslation } from "react-i18next";
import { useAuthStore } from "@store/auth.store";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import dashboardIcon from "@assets/icons/dashboard.png";
import transaction from "@assets/icons/transaction.png";
import invoices from "@assets/icons/invoices.png";
import wallet from "@assets/icons/my-wallets.png";
import settings from "@assets/icons/settings.png";
import help from "@assets/icons/help.png";
import logoutIcon from "@assets/icons/logout.png";

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isTablet: boolean
}

export default function Sidebar({ isOpen, onClose, isTablet }: SidebarProps) {
  const { t } = useTranslation();
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    clear();
    toast.success(t("app.signedOut"));
    navigate("/signin");
  };

  const handleMenuClick = (path: string, id: string) => {
    if (id === "dashboard") {
      navigate(path);
      if (isTablet) onClose();
    }
  };

  const menuItems = [
    { id: "dashboard", label: t("app.dashboard"), icon: <img src={dashboardIcon} alt="Dashboard" />, path: "/" }, 
    {
      id: "transactions",
      label: t("app.transactions"),
      icon: <img src={transaction} alt="Transactions" />,
      path: "/transactions",
    },
    { id: "invoices", label: t("app.invoices"), icon: <img src={invoices} alt="Invoices" />, path: "/invoices" },
    { id: "wallets", label: t("app.myWallets"), icon: <img src={wallet} alt="Wallets" />, path: "/wallets" },
    { id: "settings", label: t("app.settings"), icon: <img src={settings} alt="Settings" />, path: "/settings" },
  ];

  return (
    <>
      {isTablet && isOpen && <div className="sidebar__overlay" onClick={onClose} />}
      <div className={`sidebar ${isTablet && isOpen ? 'sidebar--open' : ''} ${isTablet ? 'sidebar--mobile' : ''}`}>
      <div className="sidebar__logo">
        <img src="/src/assets/logo.png" alt="Maglo" />
      </div>

      <div className="sidebar__menu">
        <nav className="sidebar__menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar__menu-item ${
                location.pathname === item.path
                  ? "sidebar__menu-item--active"
                  : ""
              } ${item.id !== "dashboard" ? "sidebar__menu-item--disabled" : ""}`}
              onClick={() => handleMenuClick(item.path, item.id)}
            >
              <span className="sidebar__menu-icon">{item.icon}</span>
              {item.id !== "dashboard" && <span className="sidebar__menu-label--disabled">{item.label}</span> } {item.id === "dashboard" && <span className="sidebar__menu-label">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar__footer">
          <button
            className="sidebar__menu-item"
            onClick={() => navigate("/help")}
            disabled
          >
            <span className="sidebar__menu-icon">{<img src={help} alt="Help" />}</span>
            <span className="sidebar__menu-footer-label">{t("app.help")}</span>
          </button>
          <button className="sidebar__menu-item" onClick={logout}>
            <span className="sidebar__menu-icon">{<img src={logoutIcon} alt="Logout" />}</span>
            <span className="sidebar__menu-footer-label">{t("app.logout")}</span>
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
