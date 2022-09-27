import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const moadlRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  
  
  componentDidMount() {
    console.log("asd1")
    window.addEventListener('keydown', this.closeModalByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEsc);
  }

  closeModalByEsc = (evt) => {
    console.log("asd2")
    if (evt.code === 'Escape') {
      this.props.toggleModal()
    }
  }
  

  closeModalByClickAround = (evt) => {
    if (evt.target === evt.currentTarget) {
      console.log("asd3")
      this.props.toggleModal()
    }
  }

  render() {
    return createPortal(
      <div className={css.Overlay}  
      onClick={this.closeModalByClickAround} 
      >
        <div className={css.Modal}>
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      moadlRoot
    );
  }
}
