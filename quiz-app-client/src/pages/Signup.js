import React, { useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // validate form and send a request to the server
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={passwordConfirm}
          onChange={event => setPasswordConfirm(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Signup