// App.jsx
import React, { useEffect, useState } from "react";
import ReminderForm from "./ReminderForm";
import ReminderList from "./ReminderList";
import "./App.css";

const API_URL = "https://6878978e63f24f1fdc9e8ab8.mockapi.io/reminders";

function App() {
  const [reminders, setReminders] = useState([]);
  const [tagFilter, setTagFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const fetchReminders = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setReminders(data);
  };

  const addReminder = async (reminder) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reminder),
    });
    const data = await response.json();
    setReminders([...reminders, data]);
  };

  const deleteReminder = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="App">
      <header>
        <h1>🔔 Reminder App</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <ReminderForm onAdd={addReminder} />

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by tag (e.g. work, personal)"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ReminderList
        reminders={reminders.filter((r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        deleteReminder={deleteReminder}
        filterTag={tagFilter}
      />
    </div>
  );
}

export default App;
