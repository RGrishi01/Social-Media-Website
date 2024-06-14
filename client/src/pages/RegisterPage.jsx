import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function Register(ev) {
    ev.preventDefault();
    let data = new FormData();
    data.set("file", file[0]);
    data.set("username", username);
    data.set("password", password);
    data.set("name", name);
    console.log(data);

    const response = await fetch("http://localhost:4000/register", {
      //yet to make this api
      method: "POST",
      body: data,
    });
    console.log(response);
    if (response.ok === false) alert("registration failed");
    else {
      alert("registration successful");
      setRedirect(true);
    }
  }
  if (redirect) return <Navigate to={"/login/"} />;

  return (
    <form className="register" onSubmit={Register}>
      <h1 className="register-header">Register</h1>
      <input type="file" onChange={(ev) => setFile(ev.target.files)} />
      <input
        className="register-name"
        type="text"
        placeholder="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <input
        className="register-username"
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        className="register-password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
