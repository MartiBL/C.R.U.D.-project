import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState("");
  const [playtime, setPlaytime] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  function handleCancel() {
    navigate(-1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      name: name,
      players: players,
      playtime: playtime,
      image: image
    };

    console.log(newUser);

    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];
    usersData.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersData));
    navigate("/");
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Create new user!</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Type a name"
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="players">Players</label>
          <input
            id="players"
            type="text"
            placeholder="Type number of players"
            onChange={e => setPlayers(e.target.value)}
          />
          <label htmlFor="playtime">Playtime</label>
          <input
            id="playtime"
            type="text"
            placeholder="Type the playtime"
            onChange={e => setPlaytime(e.target.value)}
          />
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            placeholder="Paste an image URL"
            onChange={e => setImage(e.target.value)}
          />
          <label htmlFor="image-preview"></label>
          <img
            id="image-preview"
            className="image-preview"
            src={
              image
                ? image
                : "https://placehold.co/600x400?text=Paste+an+image+URL"
            }
            alt="Choose"
            onError={e =>
              (e.target.src =
                "https://placehold.co/600x400?text=Error+loading+image")
            }
          />
          <div className="btns">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
