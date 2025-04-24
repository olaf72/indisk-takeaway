// src/components/ContactForm.tsx
import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulert innsending – du kan utvide med backend-integrasjon
    alert(`Takk for meldingen, ${name}!\n\n"${message}"`);
    setName("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium">
          Navn
        </label>
        <input
          type="text"
          id="name"
          className="w-full border border-gray-300 rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block font-medium">
          Melding
        </label>
        <textarea
          id="message"
          className="w-full border border-gray-300 rounded p-2"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
