import React, { useState } from 'react';
import axios from 'axios'
import { withRouter } from "react-router-dom";

const RegisterForm = (props) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const registerUser = () => {
    if (form.username === '' || form.password === '') return
    axios.post('http://localhost:5000/users', form)
      .then((res) => {
        console.log(res.data)
        props.history.push('/login')
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
      <div className="title">Sign up!</div>
      <div className="sub-title">Register your account now</div>
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
          onChange={handleChange}></input>
        <button onClick={registerUser}>Register</button>

      </div>
    </div>
  )


}




export default withRouter(RegisterForm);