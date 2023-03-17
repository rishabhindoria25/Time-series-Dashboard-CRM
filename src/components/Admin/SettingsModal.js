import React, { useState } from 'react';

function SettingsModal() {
//   const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   function handleOpen() {
//     setIsOpen(true);
//   }
//   function handleClose() {
//     setIsOpen(false);
//   }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Save the settings to a database here
  }

  return (
    <>
        <div className="modalsetting">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label><br />
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
            /><br />
            <label htmlFor="email">Email:</label><br />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            /><br />
            <label htmlFor="password">Password:</label><br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            /><br />
            <button type="submit">Save</button>
          </form>
        </div>
    </>
  );
}

export default SettingsModal;