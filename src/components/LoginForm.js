import React, { useState } from 'react';
import axios from 'axios'

const LoginForm = (props) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const loginUser = () => {
    axios.post('http://localhost:5000/users/login', form)
      .then((res) => {
        console.log(res.data)
        console.log(res.data)
        localStorage.setItem('accessToken', res.data.accessToken);
      }).catch((error) => {
        console.log(error)
      });
    setForm({
      password: '',
      username: ''
    })

  }
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }





  return (

    <div className="container">
      <div className="logo"><img src={props.logo}></img></div>
      <div className="title">Login</div>
      <div className="sub-title">Please enter your credentials {props.name}</div>
      <div className="formGroup">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}>
        </input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        ></input>
        <button onClick={loginUser}>Login</button>

      </div>
    </div>
  )


}




export default LoginForm;