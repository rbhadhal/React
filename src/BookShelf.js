import React from 'react';
import Book from './Book';

class BookShelf extends React.Component{

  render(){
    return (

    <div className='bookshelf'>
      <h2 className='bookshelf-title'>
        {this.props.shelf}
      </h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
        {this.props.books.map(book =>
        <Book book={book} onChange={this.props.onChangeShelf}/>

      )}
      </ol>
      </div>
    </div>
  );
  }
}

export default BookShelf;
