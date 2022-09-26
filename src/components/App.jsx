import React, { Component } from 'react';
import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    request: 'red roses wet',
    showModal: false,
    largeImageURL: "",
  };

  saveRequest = request => {
    this.setState({ request: request });
  };

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }));
  };

  pictureZoom = (evt) => {
    this.setState({ largeImageURL: evt.target.alt})
    this.toggleModal()
    
  }

  render() {
    const { request, showModal, largeImageURL } = this.state;

    return (
      <div className={css.App}>
        {showModal && <Modal largeImageURL={largeImageURL}/>}
        <Searchbar saveRequest={this.saveRequest} ></Searchbar>
        <ImageGallery request={request} pictureZoom={this.pictureZoom}></ImageGallery>
      </div>
    );
  }
}
