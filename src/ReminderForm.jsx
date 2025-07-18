import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function ReminderForm({ addReminder }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return alert("Please fill all fields");

    const newReminder = {
      id: uuidv4(),
      title,
      date,
      tag
    };

    addReminder(newReminder);
    setTitle(""); setDate(""); setTag("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Reminder Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <input
        placeholder="Tag (e.g. work)"
        value={tag}
        onChange={e => setTag(e.target.value)}
      />
      <button type="submit">Add Reminder</button>
    </form>
  );
}

export default ReminderForm;
