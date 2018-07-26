import React from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom';
import Rx from 'rxjs-compat/Rx';
import './App.css';

class SearchBooks extends React.Component{
  state = {
    query: '',
    books: []
  };
  //searchInput:  Rx.Subject<any>;

  constructor() {
      super();
      //this.searchInput = new Rx.Subject();
      //this.searchInput.debounceTime(500).subscribe(param => {
    //    this.fireSearchBook(param);
    //  });
    }

  updateBookOnSearch(book: any, shelf: string) {
      let t = this.state.books;
      const bookToUpdate = t.filter(b => b.id === book.id)[0];
      bookToUpdate.shelf = shelf;
      this.setState({
        books: t
      });
      this.props.onChange(book, shelf);
    }

  updateQuery = (query: string) => {
   this.setState({
     query: query
   });
   if (query) {
     this.fireSearchBook(query);
   } else {
     this.setState({
       books: []
     });
   }
 };

 updateBooks(books: any) {
    const checked = books.map(book => {
      book.shelf = "none";
      this.props.books.forEach(bookOnShelf => {
        if (book.id === bookOnShelf.id) {
          book.shelf = bookOnShelf.shelf;
        }
      });
      return book;
    });
    this.setState({
      books: checked
    });
  }

  fireSearchBook(query: string) {
    BooksAPI.search(query, 20).then(
      response => {
        if (response.error) {
          this.setState({
            books: []
          });
        } else {
          this.updateBooks(response);
        }
      },
      error => {
        console.log("error ocurred");
      }
    );
  }

  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value ={this.state.query}
              onChange={e => this.updateQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">

            {this.state.books.map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: try {"url(" + book.imageLinks.thumbnail + ")" catch (error){ 'nothing'}
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.updateBookOnSearch(book, e.target.value);
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
                  {book.title}
                </div>
                {book.authors &&
                  <div className="book-authors">
                    {book.authors[0]}
                  </div>}
              </li>
            )}
          </ol>
        </div>

      </div>

    )
  }
}

export default SearchBooks
