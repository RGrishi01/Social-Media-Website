import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePathnameSplit from "../hooks/usePathnameSplit";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const newPathname = usePathnameSplit();
  const username = useParams();

  async function createNewPost(ev) {
    ev.preventDefault();
    let data = new FormData();
    console.log(username + " " + caption + " " + files[0]);
    data.set("username", username);
    data.set("caption", caption);
    data.set("file", files[0]);
    console.log(files);
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    console.log(response);
    if (response.ok) {
      navigate(newPathname + "/profile");
    }
  }

  return (
    <form onSubmit={createNewPost}>
      <h1>Post Information</h1>
      <textarea
        id="caption"
        placeholder="Caption"
        rows="4"
        cols="50"
        value={caption}
        onChange={(ev) => setCaption(ev.target.value)}
        required
      ></textarea>
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
