import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [players, setPlayers] = useState("");
  const [playtime, setPlaytime] = useState("");
  const [image, setImage] = useState("");

  function handleCancel() {
    navigate(-1);
  }

  useEffect(() => {
    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];
    const user = usersData.find(user => user.id === id);
    setName(user.name);
    setPlayers(user.players);
    setPlaytime(user.playtime);
    setImage(user.image);
  }, [id]);

  function updateUser(event) {
    event.preventDefault();

    const userToUpdate = {
      name: name,
      players: players,
      playtime: playtime,
      image: image
    };

    const data = localStorage.getItem("users");
    const usersData = JSON.parse(data) || [];
    const updatedUsers = usersData.map(user => {
      if (user.id === id) {
        return { ...user, ...userToUpdate };
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate(`/user/${id}`);
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update</h1>
        <form onSubmit={updateUser}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Type a name"
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="players">Players</label>
          <input
            id="players"
            type="text"
            value={players}
            placeholder="Type number of players"
            onChange={e => setPlayers(e.target.value)}
          />
          <label htmlFor="playtime">Playtime</label>
          <input
            id="playtime"
            type="text"
            value={playtime}
            placeholder="Type the playtime"
            onChange={e => setPlaytime(e.target.value)}
          />
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            value={image}
            placeholder="Paste image url"
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
            <button>Save</button>
          </div>
        </form>
      </div>
    </section>
  );
}
