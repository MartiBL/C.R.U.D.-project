import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/user/${user.id}`);  // Correct URL with dynamic id
  }

  return (
    <div className="user-card" onClick={handleClick}>
      <img
        src={user.image || "https://placehold.co/600x400?text=Error+loading+image"}
        alt={user.name}
      />
      <h2>{user.name}</h2>
      <p>{user.players}</p>  {/* Changed from user.title to user.players */}
      <p>{user.playtime}</p>  {/* Changed from user.mail to user.playtime */}
    </div>
  );
}
