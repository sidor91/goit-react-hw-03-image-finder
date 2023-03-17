import { Component } from 'react';
import { toast } from 'react-toastify';
import { fetchImages } from '../../services/images-api';
import Modal from '../Modal';
import css from './ImageGallery.module.css';
import GalleryItem from '../GalleryItem';
import Button from '../Button';
import Loader from '../Loader';

class ImageGallery extends Component {
  state = {
    searchResult: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;
    if (prevState.page !== page) {
      this.fetchHandler(searchQuery, page);
    }
    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ page: 1, searchResult: [] });
      this.fetchHandler(searchQuery, page);
    }
  }

  fetchHandler = (searchQuery, page) => {
    this.setState({ isLoading: true });
    fetchImages(searchQuery, page)
      .then(result => {
        if (result.hits.length === 0) {
          this.setState({ searchResult: [], page: 1 });
          return toast(
            `There are no images by search request "${searchQuery}"`,
            { theme: 'dark' }
          );
        }
        this.setState(prevState => ({
          searchResult: [...prevState.searchResult, ...result.hits],
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(this.setState({ isLoading: false }));
  };

  onLoadMoreClick = () => {
      this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  clickHandler = e => {
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
