import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import css from './ImageGallery.module.css';
import GalleryItem from '../GalleryItem';

class ImageGallery extends Component {
  state = {
    showModal: false,
    largeImageURL: '',
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
    const { showModal, largeImageURL, error } =
        this.state;
      const { searchResult } = this.props;
    return (
      <>
        {error && <h1>{error.message}</h1>}
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
      </>
    );
  }
}
export default ImageGallery;

ImageGallery.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};
