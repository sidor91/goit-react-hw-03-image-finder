import { Component } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Modal';
import css from './ImageGallery.module.css';
import GalleryItem from '../GalleryItem';
import Button from '../Button';
import Loader from '../Loader';

// const instance = basicLightbox.create(`${(<Modal imageURL={largeImage} />)}`);
//   const clickHandler = e => {
//     console.log(e.target);
//     return instance.show();
//   };

class ImageGallery extends Component {
  state = {
    searchResult: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    if (
      prevState.page !== this.state.page ||
      prevProps.searchQuery !== searchQuery
    ) {
      const API_KEY = '33349547-44f128e159fc9ba4be7374396';
      const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
      this.setState({ isLoading: true });
      fetch(`${BASE_URL}&q=${searchQuery}&page=${this.state.page}`)
        .then(response => response.json())
        .then(result => {
          console.log(result.hits.length);
          if (result.hits.length === 0) {
            return toast(
              `There are no images by search request "${searchQuery}"`
            );
          }
          this.setState(prevState => ({
            searchResult: [...prevState.searchResult, ...result.hits],
          }));
        })
        .catch(error => console.log(error.message))
        .finally(this.setState({ isLoading: false }));
    }
  }

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
    
    closeModal = () => {
        this.setState({showModal: false});
    }

  clickHandler = e => {
    const imageURL = e.target.getAttribute('data-url');
    this.setState({ largeImageURL: imageURL });
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { searchResult, isLoading, showModal, largeImageURL } = this.state;
    return (
      <>
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
