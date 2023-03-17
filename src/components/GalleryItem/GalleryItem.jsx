import PropTypes from 'prop-types';
import css from './GalleryItem.module.css';

const GalleryItem = ({ url, title, largeImage }) => {
  return (
    <li className={css.galleryItem}>
      <img
        src={url}
        alt={title}
        className={css.galleryItemImage}
        data-url={largeImage}
      />
    </li>
  );
};

export default GalleryItem;
GalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};