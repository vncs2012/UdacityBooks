import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route,withRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import './App.css'
import './loader.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search:[]
    }
  }
  
componentDidMount() {
  BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
}
updateBook = (book, shelf, callback = ()=>{}) => {
  BooksAPI.update(book, shelf).then((livros) =>{
      this.updateLocal(book, shelf)
      return callback()
  })
}
updateLocal = (book, shelf) => {
  book.shelf = shelf
  this.setState(prevState => {
      return {
        books: [
              ...prevState.books.filter(
                  elem => elem.id !== book.id
              ),
              book
          ]
      }
  })
}

render() {
    const history = createBrowserHistory();
    history.push({
      pathname:'/',
      state:{ some: this.state }
    });

    return (
      <div className="app">
        <div className="list-books">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )} />
         <div className="open-search">
           <button onClick={() => window.location.href='/search'}>Add a book</button>
          </div>
          <Route name="search" exact path='/search'  render={() => (
         <Search 
               update={this.updateBook}
               booksOnShelf={this.state.books}
               {...history}
              />
          )} />
        </div>
      </div>
          
    )
  }
}

export default withRouter(BooksApp)
