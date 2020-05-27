import React, { useState } from 'react';
import axios from 'axios'

const AddAd = (props) => {
  const [newAd, setNewAd] = useState({
    title: '',
    price: '',
    info: '',
    adImage: '',
  });
  const handleChange = e => {
    console.log(e.target.value)
    setNewAd({
      ...newAd,
      [e.target.name]: e.target.value

    })
  }

  const handleFileSelect = e => {
    const image = e.target.files[0];

    setNewAd({
      ...newAd,
      [e.target.name]: e.target.files[0],
      loaded: 0,
    })
    console.log(newAd)
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
      info: '',
      adImage: null,
    })

  }


  // let bodyFormData = new FormData();
  // bodyFormData.set('title', newAd.title);
  // bodyFormData.set('price', newAd.price);
  // bodyFormData.set('info', newAd.info);
  // axios({
  //   method: 'post',
  //   url: 'http://localhost:5000/api/ads',
  //   data: bodyFormData,
  // })
  //   .then(function (response) {
  //     //handle success
  //     console.log(response);
  //   })
  //   .catch(function (response) {
  //     //handle error
  //     console.log(response);
  //   });










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
          name="adImage"
          accept="image/png, image/jpeg"
          onChange={handleFileSelect}></input>
        <button onClick={postAd}>Add ad</button>

      </div>
    </div>

  )
}

export default AddAd;