import React from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom';
import { Debounce } from 'react-throttle';
import Rx from 'rxjs-compat/Rx';
import './App.css';
import Book from './Book';

class SearchBooks extends React.Component{
  state = {
    query: '',
    books: []
  };
  //searchInput:  Rx.Subject<any>;

  constructor() {
      super();


    //  });
    }

  updateBookOnSearch = (book: any, shelf: string) => {
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
            <Debounce time='800' handler='onChange'>
            <input
              type="text"
              placeholder="Search by title or author"
              //value ={this.state.query}
              onChange={e => this.updateQuery(e.target.value)}
            />
          </Debounce>
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">

            {this.state.books.map(book =>
              <Book book={book} onChange={this.updateBookOnSearch}/>

            )}
          </ol>
        </div>

      </div>

    )
  }
}

export default SearchBooks
