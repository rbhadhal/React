import React, {Component} from 'react'


class Book extends Component {



render(){
  return (<li key={this.props.book.id} className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: (typeof this.props.book.imageLinks === 'undefined') ? ' ' : "url(" + this.props.book.imageLinks.thumbnail + ")"
        }}
      />
      <div className="book-shelf-changer">
        <select
          value={this.props.book.shelf}
          onChange={e => {
            this.props.onChange(this.props.book, e.target.value);
          }}
        >
          <option value="" disabled>
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
      {this.props.book.title}
    </div>
    {this.props.book.authors &&
      <div className="book-authors">
        {this.props.book.authors[0]}
      </div>}
  </li>
)
}
}

export default Book
