import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginSuccess } from '../actions';
import bcrypt from 'bcryptjs';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listUsers = useSelector((state) => state.users.users);
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError(`Username or password can't empty`);
      return;
    }
    if (!listUsers[username]) {
      setError('Invalid user name or password');
      return;
    }
    const isPwdValid = await bcrypt.compare(
      password,
      listUsers[username].password
    );
    if (!isPwdValid) {
      setError('Invalid user name or password');
      return;
    }
    dispatch(loginSuccess(username));
    setError('');
    navigate(state?.path || '/');
  };
  return (
    <div className='login'>
      <img className='login-image' src='/Image/login.jpg' />
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <label>Username</label>
        <input
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
