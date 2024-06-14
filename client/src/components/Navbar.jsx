import Profile from "./Profile";
import "./CSS/Navbar.css";
import usePathnameSplit from "../hooks/usePathnameSplit";

export default function Navbar() {
  const newPathname = usePathnameSplit();

  return (
    //add logo
    <div className="navbar">
      <div className="navbar-center">
        <a href={`${newPathname}`} className="navbar-item">
          Home
        </a>
        <a href={`${newPathname}/create-post`} className="navbar-item">
          Create a new Post
        </a>
        <a href={`${newPathname}/messages`} className="navbar-item">
          Messaging
        </a>
      </div>
      <Profile />
    </div>
  );
}
