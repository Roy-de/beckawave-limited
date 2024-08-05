import React, { useState } from "react";

const SimpleForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Name: ${name}, Email: ${email}`);
    // Add form submission logic here
  };

  return (
    <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          className="border rounded p-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          className="border rounded p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Submit
      </button>
    </form>
  );
};

export default SimpleForm;
