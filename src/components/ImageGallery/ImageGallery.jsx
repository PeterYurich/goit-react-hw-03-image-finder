import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    API_KEY: '29220368-6467898673c76bc95c006b920',
    pictures: '',
  };

  componentDidMount() {
    const { API_KEY } = this.state;
    const { request } = this.props;

    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo"`
    )
      .then(res => res.json())
      .then(pictures => this.setState({ pictures }));
  }

  render() {

    return (
        <div className={css.ImageGallery}></div>
    )
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
};
