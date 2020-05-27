import React, { Component } from 'react';
import axios from 'axios';
const apiUrl = 'http://localhost:5000/api/ads/owned';




class OwnedAds extends Component {
  state = {
    ads: [

    ],
    title: '',
    url: '',
    thumbnail: '',
    img: '',
    warningMsg: 'You need to login first',
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
      this.renderAdList();
    }

  }

  renderAdList() {
    axios.get(apiUrl, this.state.accessTokenConfig)

      .then(res => {
        const ads = res.data;
        this.setState({ ads });


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
    const ads = this.state.ads.map((item, key) =>
      <li key={item._id}>
        <img className="thumbnail" src={item.thumbnail} alt="adPic"></img>
        <div>
          <a href={item.url}>{item.title}</a>
          <br />
      Pris: 43.000kr
      </div>
      </li>
    );
    return (
      <div className="container">
        <div className="logo"><img src={this.props.logo}></img></div>
        <div className="title">Mc Marknaden</div>
        <div className="sub-title">Begagnade touring-motorcyklar</div>
        {!this.state.accessToken ? <div className="sub-title">{this.state.warningMsg}</div> : ''}
        <div className="adList">
          <ul>{ads}</ul>
        </div>
      </div>


    )
  }
}



export default OwnedAds;

