import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth.js"; 
import { useAuth } from "./AuthContext.jsx";

const CreateAccount = ({ setIsCreateAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { userLoggedIn } = useAuth();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate("/plant-dashboard"); 
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <section>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleCreateAccount}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? {" "}
			<button className="login-account-button" onClick={() => setIsCreateAccount(false)}>Login</button></p>
    </section>
  );
};

export default CreateAccount;
