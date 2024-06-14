import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirect2, setRedirect2] = useState(false);

  async function login(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then(() => {
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
      setRedirect2(true);
    }
  }

  if (redirect2) return <Navigate to="/register" />;

  if (redirect) {
    return <Navigate to={`/loggedin/${username}`} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
