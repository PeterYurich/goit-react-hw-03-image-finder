import React from 'react';

import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = pictures => (
  pictures.map(picture => (<div key={picture.id} className={css.ImageGalleryItem}>
    <img src={picture.webformatURL} alt={largeImageURL}></img>
  </div>))
);

ImageGalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object),
};
