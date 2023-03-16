import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
// import Modal from './Modal';
import Loader from './Loader';


export class App extends Component {
  state = {
    searchQuery: '',
    searchResult: [],
    isLoading: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.fetchImages(this.state);
    } 
  }

  fetchImages = ({ searchQuery, page }) => {
    const API_KEY = '33349547-44f128e159fc9ba4be7374396';
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;
    this.setState({ isLoading: true });
    fetch(`${BASE_URL}&q=${searchQuery}&page=${page}`)
      .then(response => response.json())
      .then(
        result =>
        this.setState(
          prevState =>
          ({
            searchResult: [...prevState.searchResult, ...result.hits],
          })
        )
      )
      .catch(error => console.log(error))
      .finally(this.setState({ isLoading: false }));
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery, searchResult: [], page: 1 });
  };

  render() {
    const { searchResult, isLoading } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {searchResult.length > 0 && <ImageGallery images={searchResult} />}
        {isLoading && <Loader />}
        {searchResult.length > 0 && <Button onClick={this.onLoadMoreClick} />}
      </div>
    );
  }
};
