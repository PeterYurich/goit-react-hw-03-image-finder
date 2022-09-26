import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    API_KEY: '29220368-6467898673c76bc95c006b920',
    pictures: null,
  };

  componentDidUpdate(prevProps) {
    const { API_KEY } = this.state;
    const { request } = this.props;

    if (this.props !== prevProps) {
      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo"`
      )
        .then(res => res.json())
        .then(pictures => this.setState({ pictures: pictures.hits }));
    }
  }

  render() {
    const { pictures } = this.state;
    const { pictureZoom } = this.props;

    return (
      <ul className={css.ImageGallery}>
        {pictures &&
          pictures.map(picture => (
            // <ImageGalleryItem picture={picture} />
            <li key={picture.id} className={css.ImageGalleryItem}>
              <img
                onClick={pictureZoom}
                src={picture.webformatURL}
                alt={picture.largeImageURL}
              ></img>
            </li>
          ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  pictureZoom: PropTypes.func.isRequired
};
