import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';


export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} />
        {/* {searchQuery !== '' && (
          <ImageGallery searchQuery={searchQuery} />
        )} */}
        <ToastContainer theme="dark" />
      </div>
    );
  }
}
