import React from 'react';
import { Link } from "react-router-dom";

import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';

class ListBooks extends React.Component{
  state = {};

  handleChange = (bookId: string, e:any) =>{
    let b = this.props.books;
    const book = b.filter(c=> c.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {this.setState({books: b});
  });
};

  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        <BookShelf books = {this.props.books.filter(book => book.shelf === 'currentlyReading')} shelf= 'Currently Reading'onChangeShelf={this.handleChange}/>
        <BookShelf books = {this.props.books.filter(book => book.shelf === 'wantToRead')} shelf= 'Want to Read'onChangeShelf={this.handleChange}/>
        <BookShelf books = {this.props.books.filter(book => book.shelf === 'read')} shelf= 'Read' onChangeShelf={this.handleChange}/>
        </div>
        <div className="open-search">
         <Link to="/search">Add a book</Link>
       </div>
      </div>

    )
  }
}

export default ListBooks;
