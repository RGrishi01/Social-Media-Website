import { Link } from "react-router-dom";

function AuthPage() {
  return (
    <div className="landing-container">
      <header>
        <h1>Welcome to Social Media</h1>
        <form>
          <Link className="login" to="/login">
            Login
          </Link>
          <Link className="register" to="/register">
            Register
          </Link>
        </form>
      </header>
    </div>
  );
}

export default AuthPage;
