import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { fetchImages } from '../../services/images-api';
import Modal from '../Modal';
import css from './ImageGallery.module.css';
import GalleryItem from '../GalleryItem';
import Button from '../Button';
import Loader from '../Loader';

class ImageGallery extends Component {
  state = {
    searchQuery: '',
    searchResult: [],
    page: 0,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    error: null,
  };

  componentDidMount() {
    this.fetchHandler();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;
    if (prevProps.searchQuery !== searchQuery) {
      this.setState({
        searchResult: [],
        page: 1,
        searchQuery: searchQuery,
      });
    }
      if (prevState.page !== page) {
      this.fetchHandler();
    }
  }

  fetchHandler = () => {
    if (this.state.page === 0) {
      return;
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      fetchImages(this.props.searchQuery, this.state.page)
        .then(result => {
          if (result.hits.length === 0) {
            this.setState({ searchResult: [], page: 1 });
            return toast(
              `There are no images by search request "${this.props.searchQuery}"`,
              { theme: 'dark' }
            );
          }
          this.setState(prevState => ({
            searchResult: [...prevState.searchResult, ...result.hits],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(this.setState({ isLoading: false }));
    }, 500);
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  clickHandler = e => {
    if (e.target === e.currentTarget) {
      return;
    }
    const imageURL = e.target.getAttribute('data-url');
    this.setState({ largeImageURL: imageURL });
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { searchResult, isLoading, showModal, largeImageURL, error } =
      this.state;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        {this.props.searchQuery && (
          <ul className={css.imageGallery} onClick={this.clickHandler}>
            {searchResult.map(({ id, webformatURL, tags, largeImageURL }) => (
              <GalleryItem
                key={id}
                url={webformatURL}
                title={tags}
                largeImage={largeImageURL}
              />
            ))}
          </ul>
        )}
        {showModal && (
          <Modal imageURL={largeImageURL} onClick={this.closeModal} />
        )}
        {isLoading && <Loader />}
        {searchResult.length > 0 && <Button onClick={this.onLoadMoreClick} />}
      </>
    );
  }
}
export default ImageGallery;

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
