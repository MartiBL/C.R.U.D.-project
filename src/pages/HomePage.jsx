import { useState, useEffect } from 'react';
import User from "../components/User.jsx";

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    initializeUsers();

    async function initializeUsers() {
      const data = localStorage.getItem("users");

      if (!data) {
        console.log("No users in localStorage, fetching from JSON...");
        // Fetch users from the JSON and save them to localStorage if localStorage is empty
        const fetchedUsers = await fetchUsers();
        
        // Filter out any invalid or empty users
        const validUsers = fetchedUsers.filter(user => user && user.id && user.name);

        if (validUsers.length > 0) {
          console.log("Fetched valid users from JSON:", validUsers);
          localStorage.setItem("users", JSON.stringify(validUsers));
          setUsers(validUsers);
        } else {
          console.error("No valid users found to store");
        }
      } else {
        // If there are users in localStorage, use them
        const storedUsers = JSON.parse(data);
        const validStoredUsers = storedUsers.filter(user => user && user.id && user.name);
        console.log("Valid users found in localStorage:", validStoredUsers);
        setUsers(validStoredUsers);
      }
    }
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch("https://raw.githubusercontent.com/MartiBL/JSONforgames-crudproject/main/games.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return [];
    }
  }

  return (
    <div className="page">
      <h1>Home Page</h1>
      <p>This is the home page. If nothing is showing up, go to inspect,application and delete the empty user. Sometimes it generates one, I do not understand why</p>
      <section className="grid">
        {users.length > 0 ? (
          users.map(user => (
            <User key={user.id} user={user} />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </section>
    </div>
  );
}
