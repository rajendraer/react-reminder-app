// ReminderList.jsx
import React, { useEffect } from "react";

function ReminderList({ reminders, deleteReminder, filterTag }) {
  // Sort by date (ascending)
  const sortedReminders = [...reminders]
    .filter(r =>
      filterTag ? r.tag.toLowerCase().includes(filterTag.toLowerCase()) : true
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      sortedReminders.forEach(reminder => {
        const reminderTime = new Date(reminder.date).getTime();
        if (reminderTime - now.getTime() <= 1000 && reminderTime - now.getTime() >= 0) {
          // 🔊 Sound alert
          const audio = new Audio('/alert.mp3'); // You must place alert.mp3 in `public` folder
          audio.play();
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sortedReminders]);

  return (
    <div className="reminder-list">
      {sortedReminders.map(rem => (
        <div key={rem.id} className="reminder">
          <h3>{rem.title}</h3>
          <p>📅 {new Date(rem.date).toLocaleString()}</p>
          <p>🏷️ {rem.tag}</p>
          <button onClick={() => deleteReminder(rem.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ReminderList;
