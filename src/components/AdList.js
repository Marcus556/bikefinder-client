import React, { Component } from 'react';
import axios from 'axios';
const apiUrl = 'http://localhost:5000/api/ads';



class AdList extends Component {
  state = {
    ads: [
      {
        "_id": "5eb8735df9418e2c3475ad18",
        "title": "Honda transalp 600 ",
        "url": "/annons/kronoberg/honda_transalp_600/89830383",
        "thumbnail": "https://i.blocketcdn.se/pictures/9272070162.jpg?type=gallery_big",
        "img": "https://i.blocketcdn.se/pictures/9272070162.jpg?type=original",
        "__v": 0
      },
    ],
    title: '',
    url: '',
    thumbnail: '',
    img: '',
  }
  static defaultProps = {
    logo: 'logo'
  };

  componentDidMount() {
    this.renderAdList();
  }

  renderAdList() {
    axios.get(apiUrl)
      .then(res => {
        const ads = res.data;
        this.setState({ ads });
      })
  }

  render() {
    const ads = this.state.ads.map((item, key) =>
      <li key={item.id}>
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
        <div className="adList">
          <ul>{ads}</ul>
        </div>
      </div>


    )
  }
}



export default AdList;

