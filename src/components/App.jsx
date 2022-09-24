import React, { Component } from 'react';
import css from './App.module.css';

// import { Searchbar } from './Searchbar/Searchbar';
import { SearchForm } from './SearchForm/SearchForm';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    request: 'red roses wet',
    loader: false,
  };

  saveRequest = (request) => {
    this.setState({request: request})
  }

  render() {
    const { request, loading } = this.state;

    return (
      <div className={css.App}>
        <div>
          <SearchForm saveRequest={this.saveRequest}></SearchForm>
        </div>
        {loading === true && (
          <ImageGallery request={request}></ImageGallery>
        )}
      </div>
    );
  }
}
