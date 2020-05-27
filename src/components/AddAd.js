import React, { Component } from 'react';
import axios from 'axios'


class AddAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: false,
      warningMsg: '',
      title: '',
      price: '',
      info: '',
      adImage: '',
      accessToken: localStorage.getItem('accessToken'),
      accessTokenConfig: {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 'content-type': 'multipart/form-data' }
      }

    }
  }
  static defaultProps = {
    logo: 'logo'
  };


  componentDidMount() {

  }

  handleChange = e => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleFileSelect = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    })
    console.log(this.state.adImage)
  }

  postAd = () => {
    const { title, price, info, adImage } = this.state
    if (title === '' || price === '' || info === '') {
      this.setState({
        showWarning: true,
        warningMsg: 'Please fill out the entire form!'
      })
      return
    } else if (adImage == '') {
      this.setState({
        showWarning: true,
        warningMsg: 'Please upload a picture for your ad!'
      })
      return
    }
    const data = new FormData()
    data.append('title', title)
    data.append('price', price)
    data.append('desc', info)
    data.append('adImage', adImage)
    axios.post('http://localhost:5000/api/ads', data, this.state.accessTokenConfig)
      .then((res) => {
        console.log(res.data)
        if (res.status === 500) {
          console.log('500 test funkar')
        }
      }).catch((error) => {
        console.log(error)
      });
    this.setState({
      title: '',
      price: '',
      info: '',
      adImage: null,
    })

  }




  render() {
    return (
      <div className="container">
        <div className="logo"><img src={this.props.logo}></img></div>
        <div className="title">Add an ad</div>
        <div className="sub-title">Enter your ad-info here:</div>
        <div className="formGroup">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}>
          </input>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}>
          </input>
          <label htmlFor="info">Information:</label>
          <textarea
            name="info"
            value={this.state.info}
            onChange={this.handleChange}>
          </textarea>
          <label htmlFor="img">Upload an image:</label>
          <input type="file"
            name="adImage"
            accept="image/png, image/jpeg"
            onChange={this.handleFileSelect}></input>
          {this.state.showWarning ? <span className="warningMsg">{this.state.warningMsg}</span> : ''}
          <button onClick={this.postAd}>Add ad</button>

        </div>
      </div>

    )
  }
}



export default AddAd;

