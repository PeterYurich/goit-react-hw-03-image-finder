import React from 'react';

import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = picture => (
  
  <li key={picture.id} className={css.ImageGalleryItem}>
    <img src={picture.webformatURL} alt={picture.largeImageURL} width="200"></img>
  </li>
);

ImageGalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object),
};
