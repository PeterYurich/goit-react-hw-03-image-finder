import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Audio } from 'react-loader-spinner';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import css from './ImageGallery.module.css';
// import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    API_KEY: '29220368-6467898673c76bc95c006b920',
    pictures: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps) {
    const { API_KEY } = this.state;
    const { request } = this.props;

    if (this.props !== prevProps) {
      this.setState({ status: 'pending' });
      // setTimeout(() => {
      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo"`
      )
        .then(res => {
          console.log('res:', res);
          if (res.ok) {
            // console.log("res.json():", res.json())
            return res.json();
          }
          return Promise.reject(
            new Error(`no pictures, found by "${request}"`)
          );
        })
        .then(res => {
          console.log('pictures:', res.hits);
          if (res.hits.length === 0) {
            this.setState({ status: 'nothingFound' })
            return
          }
          this.setState({ pictures: res.hits, status: 'resolved' });
        })
        .catch(error => {
          console.log('error is:', error);
          this.setState({ status: 'rejected' });
        });
      // }, 1000);
    }
  }

  render() {
    const { pictures, status } = this.state;
    const { openModal } = this.props;
    console.log('this.state.pictures:', this.state.pictures);

    return (
      <div>
        {status === 'pending' && (
          <div className={css.Loader}>
            <Audio
              height="200"
              width="200"
              radius="15"
              color="blue"
              ariaLabel="five-dots-loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        )}

        {status === 'resolved' && (
          <ul className={css.ImageGallery}>
            {pictures &&
              pictures.map(picture => (
                // <ImageGalleryItem picture={picture} />
                <li key={picture.id} className={css.ImageGalleryItem}>
                  <img
                    onClick={openModal}
                    src={picture.webformatURL}
                    alt={picture.largeImageURL}
                  ></img>
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
