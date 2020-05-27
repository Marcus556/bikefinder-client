import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import SortingBar from './SortingBar'
const apiUrl = 'http://localhost:5000/api/ads';




class AdList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: [],
      sorted: false,
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

  sortAds(e) {

    const sortFactor = e.target.dataset.tag;
    if (sortFactor === 'date') {
      if (!this.state.sorted) {
        let ads = this.state.ads.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
        this.setState({
          ads,
          sorted: true
        })
      }
      if (this.state.sorted) {
        let ads = this.state.ads.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
        this.setState({
          ads,
          sorted: false
        })
      }
    }

    if (sortFactor === 'name') {
      if (!this.state.sorted) {
        let ads = this.state.ads.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        this.setState({
          ads,
          sorted: true
        })
      }
      if (this.state.sorted) {
        let ads = this.state.ads.sort((a, b) => (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0));
        this.setState({
          ads,
          sorted: false
        })
      }
    }
    if (sortFactor === 'price') {
      if (!this.state.sorted) {
        let ads = this.state.ads.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        this.setState({
          ads,
          sorted: true,
        })
      }
      if (this.state.sorted) {
        let ads = this.state.ads.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        this.setState({
          ads,
          sorted: false,
        })
      }
    }
  }


  render() {

    let ads = this.state.ads.map((item, key) =>
      <li key={item._id}>
        <img className="thumbnail" src={item.thumbnail} alt="adPic"></img>
        <div>
          <Link to={`/singlead/${item._id}`}>{item.title}</Link>
          <br />
      Pris: {item.price} kr
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
          {this.state.accessToken ? <SortingBar sort={this.sortAds.bind(this)}></SortingBar> : ''}

          <ul>
            {ads}
          </ul>
        </div>
      </div>


    )

  }
}



export default AdList;

