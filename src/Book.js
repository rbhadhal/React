import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  constructor(props){
    super(props);
    this.state ={
      id: this.props.book.id,
      title: '',
      authors: [''],
      imageLinks: {smallThumbnail: ''},
      shelf: 'none'
    }

  }
  handleChange(event) {
      let newShelf=event.target.value
      let previousShelf=this.state.shelf  // so we can rollback the change later if API call fails
      this.setState({shelf: newShelf})   // hoping API call won't fail
      BooksAPI
        .update({'id': this.state.id}, newShelf)   // API call
        .then((shelvesObject) => this.props.updateShelf(shelvesObject))
        // NB this updates the currentlyReading, read and wantToRead shelves, but not the searchResults shelf.
        // This is why we had to do this.setState({shelf: newShelf}) a few lines earlier to manually upate the shelf state of this book
        // so that the book status is shown correctly in the searchResults shelf
        .catch(() => (this.setState({shelf: previousShelf})))        // rollback if API call failed
    }

componentDidMount(){
  this.setState(this.props.book)
}


render(){
  return (
  <div className="book">
    <div className="book-top">
      <div className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${this.state.imageLinks.smallThumbnail})`}}>
        </div>
      <div className="book-shelf-changer">
        <select
          value={this.state.shelf}
          onChange={e => {
            this.handleChange(e.target);
          }}
        >
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">
      {this.state.title}
    </div>
    {this.state.authors &&
      <div className="book-authors">
        {this.state.authors[0]}
      </div>}
  </div>
)
}
}

export default Book
