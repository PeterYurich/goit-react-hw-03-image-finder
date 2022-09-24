import React, { Component } from 'react';
import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { SearchForm } from './SearchForm/SearchForm';

export class App extends Component {
  state = {
    API_KEY: '29220368-6467898673c76bc95c006b920',
    request: 'red roses wet',
    pictures: '',
    // loading: false,
  };

  componentDidMount() {
    const { API_KEY, request,  } = this.state;

    // this.setState({loading: true});
    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo"`
    )
      .then(res => res.json())
      .then(pictures => this.setState({ pictures }))
      // .finally(this.setState({loading: false}));
  }

  // sendRequest = () => {  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar>
          <SearchForm></SearchForm>
        </Searchbar>
      </div>
    );
  }
}
