import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts(username);
  }, [username]);

  async function fetchPosts(username) {
    try {
      const response = await fetch("http://localhost:4000/your-posts", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ username }),
        headers: { "Content-type": "application/json" },
      });

      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (err) {
      console.log("Error while fetching your posts: ", err);
    }
  }

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      <div className="posts">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <img
              src={"http://localhost:4000/" + post.cover}
              alt="Post cover"
              className="post-cover"
            />
            <p className="post-caption">{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
