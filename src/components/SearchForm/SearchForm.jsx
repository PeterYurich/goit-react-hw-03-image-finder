import React, { Component } from 'react';

import css from './SearchForm.module.css';

export class SearchForm extends Component {
  state = {
    request: '',
  };

  handleControlInput = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.request.trim() === '') {
      alert('enter something')
      return
    }

    this.props.saveRequest(this.state.request);
    this.setState({request: ''})
  };

  render() {
    const { request } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={css.SearchForm}>
        <input
          type="text"
          name="request"
          value={request}
          onChange={this.handleControlInput}
        />
      </form>
    );
  }
}
