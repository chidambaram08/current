import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the user token and role from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect the user to the login page
    navigate("/");
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>Logging Out...</h1>
        <p>You are being redirected to the login page.</p>
      </div>
    </div>
  );
}
