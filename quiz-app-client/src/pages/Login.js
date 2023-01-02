import {useState} from 'react'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function handleSubmit(event) {
      event.preventDefault();
      // validate form and send a request to the server
    }
  
    return (
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log in</button>
      </form>
    );
}

export default Login