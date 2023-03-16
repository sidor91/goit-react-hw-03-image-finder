import css from './GalleryItem.module.css'

const GalleryItem = ({url, title}) => {
    return (
      <li className={css.galleryItem}>
        <img src={url} alt={title} className={css.galleryItemImage} />
      </li>
    );
}

export default GalleryItem;



