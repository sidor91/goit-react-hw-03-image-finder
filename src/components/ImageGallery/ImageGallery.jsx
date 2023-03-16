import css from './ImageGallery.module.css';
import GalleryItem from '../GalleryItem';

const ImageGallery = ({ images }) => {
    return (
      <ul className={css.imageGallery}>
        {images.map(image => (
          <GalleryItem
            key={image.id}
            url={image.webformatURL}
            title={image.tags}
          />
        ))}
      </ul>
    );
};

export default ImageGallery;


