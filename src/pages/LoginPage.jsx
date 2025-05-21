import { useState } from "react";
import AuthForm from "../components/AuthForm.jsx";
import GoogleLoginButton from "../components/GoogleLoginButton";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Մուտք</h1>

        {!showAuthForm ? (
          <button
            className="email-login-button"
            onClick={() => setShowAuthForm(true)}
          >
            Մուտքագրել էլ․ հասցեով
          </button>
        ) : (
          <AuthForm />
        )}

        <div className="google-button-wrapper">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
