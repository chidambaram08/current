import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "hrmanager") {
          navigate("/hr-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <section
      className="vh-100 gradient-custom"
      style={{ backgroundColor: "#263043" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card"
              style={{ borderRadius: "1rem", backgroundColor: "#ffffff" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2
                    className="fw-bold mb-2 text-uppercase"
                    style={{ color: "#000000" }}
                  >
                    Login
                  </h2>
                  <p className="text-black-50 mb-5">
                    Please enter your login and password!
                  </p>

                  {error && <p className="text-danger">{error}</p>}

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typeEmailX"></label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      className="form-label"
                      htmlFor="typePasswordX"
                    ></label>
                  </div>

                  <button
                    className="btn btn-dark btn-lg px-5"
                    type="submit"
                    onClick={handleLogin}
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-dark">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-dark mx-4 px-2">
                      <i className="fab fa-twitter fa-lg"></i>
                    </a>
                    <a href="#!" className="text-dark">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
