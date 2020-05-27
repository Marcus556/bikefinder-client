import React from 'react';
import { Link } from "react-router-dom";

const SortingBar = (props) => {

  return (
    <div className='sortingBar'>
      <button className="sortingButton" onClick={props.sort} data-tag="price">Sortera på pris</button>
      <button className="sortingButton" onClick={props.sort} data-tag="name">Sortera efter namn</button>
      <button className="sortingButton" onClick={props.sort} data-tag="date">Sortera efter datum</button>
    </div>
  )
}

export default SortingBar;

// sortAds() {
//   if (!this.state.sortedByPrice) {
//     let ads = this.state.ads.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
//     this.setState({
//       ads,
//       sortedByPrice: true,
//     })
//   }
//   if (this.state.sortedByPrice) {
//     let ads = this.state.ads.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
//     this.setState({
//       ads,
//       sortedByPrice: false,
//     })
//   }
// }