import React, { Component } from 'react';
import css from './App.module.css';
import { Audio } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from 'components/Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    request: '',
    showModal: false,
    API_KEY: '29220368-6467898673c76bc95c006b920',
    page: 1,
    pictures: [],
    largeImageURL: '',
    isLoadMoreBtn: false,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { API_KEY, page, request, pictures } = this.state;

    if ((request !== prevState.request) || (page !== prevState.page)) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
      )
        .then(res => {
          // console.log('res:', res);
          if (res.ok) {
            return res.json();
          }
        })
        .then(res => {
          // console.log('pictures:', res.hits);
          if (res.hits.length === 0) {
            this.setState({ status: 'nothingFound' });
            return;
          }
          this.setState({
            pictures: [...pictures, ...res.hits],
            status: 'resolved',
            isLoadMoreBtn: true,
          });
        })
        .catch(error => {
          console.log('error is:', error);
          this.setState({ status: 'rejected' });
        });
    }
  }

  saveRequest = request => {
    this.setState({ request: request });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  pictureToModal = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL });
    this.toggleModal();
  };

  showLoadMoreBtn = () => {
    this.setState({ isLoadMoreBtn: true });
  };

  toNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }

  render() {
    const {
      request,
      showModal,
      largeImageURL,
      isLoadMoreBtn,
      status,
      pictures,
    } = this.state;

    return (
      <div className={css.App}>
        <Searchbar saveRequest={this.saveRequest}></Searchbar>

        {status === 'pending' && (
          <div >
            <Audio
              height="200"
              width="200"
              radius="15"
              color="blue"
              ariaLabel="five-dots-loading"
              wrapperStyle
              wrapperClassName="css.Loader_container"
            />
          </div>
        )}
 
        {status === 'resolved' && (
          <ImageGallery
            openModal={this.pictureToModal}
            showLoadMoreBtn={this.showLoadMoreBtn}
            pictures={pictures}
          ></ImageGallery>
        )}

        {status === 'nothingFound' && (
          <p> There are no pictures found by your request "{request}"</p>
        )}

        {status === 'rejected' && (
          <p>
            The servise couldn't find any pictures. Reload the page and try to
            again.
          </p>
        )}

        {isLoadMoreBtn && <LoadMoreBtn onClick={this.toNextPage}></LoadMoreBtn>}

        {showModal && (
          <Modal largeImageURL={largeImageURL} toggleModal={this.toggleModal} />
        )}
      </div>
    );
  }
}
