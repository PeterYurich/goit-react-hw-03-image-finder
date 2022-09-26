import React, { Component } from 'react';

import css from './Modal.module.css';

export class Modal extends Component {

    componentDidMount = () => {
        const overlay = document.querySelector("Overlay")
        overlay.addEventListener("key")
    }


  render() {


    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.largeImageURL.largeImageURL} alt="picture" />
        </div>
      </div>
    );
  }
}
