import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListSearch from './ListSearch'
import {DebounceInput} from 'react-debounce-input';
import './App.css'

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        query: '',
        books: []
    }
    
}
    updateQuery = (query) => {
        if (!query) {
            console.log(query)
            this.setState({query: '', books: []})
        } else {
            this.setState({ query: query.trim()})
            console.log(this.state.query)
            BooksAPI.search(this.state.query).then((books) => {
                if(books.books.error){
                    books = []
                }else{
                    books.books.map(book => (this.props.booksOnShelf.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
                }
                this.setState({
                    books,
                    query: ''
                })
            })
        }
    }
    updateLocal = (book, shelf, callback = ()=>{}) => {
        book.shelf = shelf
        var isset =this.props.booksOnShelf.filter((b) => b.id === book.id)
        if(isset.length === 0){
            BooksAPI.update(book, shelf).then(() =>{
                this.props.location.state.some.books.push(book)
            })
        }
        return callback();
      }
    render(){
    return(<div>
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.props.goBack()}>Close</button>
                    <div className="search-books-input-wrapper">
                    <DebounceInput
                    placeholder="Search by title"
                    onChange={(e) => this.updateQuery(e.target.value)}
                    value={this.state.pesquisa}
                    minLength={1}
                    debounceTimeout={5}
                      />
                    </div>
                </div>
                <div className="search-books-results">
                <ListSearch 
                     livros={this.state.books}
                     onUpdateBook={this.updateLocal}
                    />
                </div>
            </div>
        </div>
    )
    }

}
export default Search
