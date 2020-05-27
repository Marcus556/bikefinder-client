import React, { useState } from 'react';
import axios from 'axios'

const AddAd = (props) => {
  const [newAd, setNewAd] = useState({
    title: '',
    price: '',
    info: ''
  });
  const handleChange = e => {
    setNewAd({
      ...newAd,
      [e.target.name]: e.target.value
    })
  }
  const accessToken = localStorage.getItem('accessToken');
  const accessTokenConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  }



  const postAd = () => {
    axios.post('http://localhost:5000/api/ads', newAd, accessTokenConfig)
      .then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      });
    setNewAd({
      title: '',
      price: '',
      info: ''
    })

  }










  return (
    <div className="container">
      <div className="logo"><img src={props.logo}></img></div>
      <div className="title">Add an ad</div>
      <div className="sub-title">Enter your ad-info here:</div>
      <div className="formGroup">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={newAd.title}
          onChange={handleChange}>
        </input>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={newAd.price}
          onChange={handleChange}>
        </input>
        <label htmlFor="info">Information:</label>
        <textarea
          name="info"
          value={newAd.info}
          onChange={handleChange}>
        </textarea>
        <label htmlFor="img">Upload an image:</label>
        <input type="file"
          name="imgmg"
          accept="image/png, image/jpeg"></input>
        <button onClick={postAd}>Add ad</button>

      </div>
    </div >

  )
}

export default AddAd;