import React, { useState } from 'react';
import axios from 'axios'
import { withRouter, Link } from "react-router-dom";

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
        localStorage.setItem('loggedIn', true);
        if (res.data.admin === true) {
          localStorage.setItem('isAdmin', 'true');
        }
        if (res.data.accessToken) {
          props.toggleLoggedIn()
          props.history.push("/");

        }


      })
      .catch((error) => {
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
        <p>No account? <Link className="register-link" to="/register">Sign up today!</Link></p>

      </div>
    </div>
  )


}




export default withRouter(LoginForm);