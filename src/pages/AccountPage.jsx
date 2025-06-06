import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/AccountPage.css";
import Notes from "./Notes";
import ConfirmModal from "../components/ConfirmModal";
import History from "../components/history/History";

const AccountPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState("notes");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "notes":
        return (
          <div className="section-notes">
            <Notes />
          </div>
        );
      case "profile":
        return <div className="section-profile">⚙️ Աջաթհման պրոֆիլ</div>;
      case "settings":
        return <div className="section-settings">🔧 Կարգավորումներ</div>;
      default:
        return <div>Ընտրեք բաժին ձախից։</div>;
      case "history":
        return (
          <div className="section-history">
            <History />
          </div>
        );
    }
  };

  return (
    <>
      <div className="account-container">
        <div className={`sidebar ${selectedSection}`}>
          <h2>Բարի գալուստ {user?.username || "Օգտատեր"} 👷‍♂️</h2>
          <button
            onClick={() => setSelectedSection("notes")}
            className={selectedSection === "notes" ? "active" : ""}
          >
            Նշումներ
          </button>
          <button
            onClick={() => setSelectedSection("history")}
            className={selectedSection === "history" ? "active" : ""}
          >
            Պատմություն
          </button>

          <button
            onClick={() => setSelectedSection("profile")}
            className={selectedSection === "profile" ? "active" : ""}
          >
            Պրոֆիլ
          </button>
          <button
            onClick={() => setSelectedSection("settings")}
            className={selectedSection === "settings" ? "active" : ""}
          >
            Կարգավորումներ
          </button>
          <button
            className="logout-btn"
            onClick={() => setShowLogoutModal(true)}
          >
            Ելք
          </button>
        </div>
        <div className={`content-area ${selectedSection}`}>
          {renderContent()}
        </div>
      </div>

      {showLogoutModal && (
        <ConfirmModal
          message="Վստահ եք, որ ցանկանում եք դուրս գալ?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default AccountPage;
