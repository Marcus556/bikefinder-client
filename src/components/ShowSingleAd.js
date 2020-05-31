import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import SendMessage from './SendMessage'
import ApiDeleteButton from './ApiDeleteButton'
const apiUrl = 'http://localhost:5000/api/ads/';





class ShowSingleAd extends Component {
  state = {
    ad: [

    ],
    accessToken: localStorage.getItem('accessToken'),
    accessTokenConfig: {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    }
  }
  static defaultProps = {
    logo: 'logo'
  };



  componentDidMount() {
    if (this.state.accessToken) {
      this.getAd();
    }

  }

  getAd() {
    const id = this.props.match.params.userid;
    axios.get(`${apiUrl}${id}`, this.state.accessTokenConfig)

      .then(res => {
        const ad = res.data;
        console.log(ad)
        this.setState({ ad });

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          if (error.response.status === 403) {
          }
        }
      })
  }


  render() {

    return (
      <div>
        <ApiDeleteButton deleteUrl={`${apiUrl}/${this.state.ad._id}`} route='/'></ApiDeleteButton>
        <div className="single-ad-container">
          <div className="logo"><img src={this.props.logo}></img></div>
          <div className="title">Mc Marknaden</div>
          <div className="sub-title">Begagnade touring-motorcyklar</div>
          <div className="sub-title">{this.state.ad.title}</div>
          <div className="sub-title"><img src={this.state.ad.img} style={{ width: 400 + 'px' }} alt="ad-picture"></img></div>
          <div className="ad-info"><p>Inlagd av: {this.state.ad.owner}</p></div>
          <div className="ad-info"><p>{this.state.ad.desc}</p></div>
          <div className="sub-title"><p>{this.state.ad.price} kr</p></div>
          <SendMessage recipient={this.state.ad.owner} title={this.state.ad.title}></SendMessage>


        </div>
      </div>



    )
  }
}



export default withRouter(ShowSingleAd);

