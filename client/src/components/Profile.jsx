import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CSS/Navbar.css"; // Make sure to import the CSS if necessary
import usePathnameSplit from "../hooks/usePathnameSplit";

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const newPathname = usePathnameSplit();
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    getProfile(username);
  }, [username]);

  async function getProfile(username) {
    console.log("username: ", username);
    try {
      const response = await fetch("http://localhost:4000/profile", {
        method: "POST",
        body: JSON.stringify({ username }),
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProfile(data);
      console.log(data);
    } catch (err) {
      console.log("Error while fetching profile details: ", err);
    }
  }

  async function handleRedirect() {
    navigate(newPathname + "/profile");
  }

  return (
    <div className={`navbar-profile`} onClick={handleRedirect}>
      {profile && profile.username && (
        <>
          <img
            src={`http://localhost:4000/${profile.cover}`}
            alt="Profile"
            className="profile-picture"
          />
          <button className="profile-button">{profile.username}</button>
        </>
      )}
    </div>
  );
}
