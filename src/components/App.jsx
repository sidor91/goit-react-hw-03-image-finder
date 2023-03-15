import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
// import Modal from './Modal';
// import Loader from './Loader';


export const App = () => {

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery />
      <Button />
    </div>
  );
};
