import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'

import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {



  constructor(props){
    super(props);



    //console.log(books);
    this.state = {
      books: [],
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */


      showSearchPage: false
    };
  }
  handleChange = (book: any, shelf: string) => {
    BooksAPI.update(book, shelf).then(response => {
      BooksAPI.getAll().then(books => { this.setState({books: books})});
    });
  }
  componentDidMount(){
    BooksAPI.getAll().then(data => {this.setState({books: data})});
    //const book1 = this.state.books[0];
    //console.log(this.state.books);
  }
    //const title = book1[0];
    //console.log(title);

  //const books = [];

  render() {

    return (
      <div className="app">
        <Route exact path='/' render={() => <ListBooks books={this.state.books}/> }/>
        <Route
          path='/search'
          render={() => <SearchBooks onChange = {this.handleChange} books={this.state.books} />}
        />
            </div>

    );
  }
}

export default BooksApp
