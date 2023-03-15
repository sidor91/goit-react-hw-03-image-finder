import css from './GalleryItem.module.css'

const GalleryItem = () => {
    return (
      <li className={css.galleryItem}>
        <img src='' alt='' className={css.galleryItemImage} />
      </li>
    );
}

export default GalleryItem;



