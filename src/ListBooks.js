import React from 'react'
import Lendo from './Lendo'
import QueroLer from './QueroLer'
import Finalizado from './Finalizado'
import './App.css'

class ListBooks extends React.Component{
    
        render(){
        return(
        <div>
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">CURRENTLY READING</h2>
                <div className="bookshelf-books">
                    <Lendo 
                        livros={this.props.books}
                        onUpdateBook={this.props.onUpdateBook} 
                     />
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">WANT TO READ</h2>
                <div className="bookshelf-books">
                <QueroLer 
                    livros={this.props.books}
                    onUpdateBook={this.props.onUpdateBook}
                    />
                </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">READ</h2>
                <div className="bookshelf-books">
                <Finalizado 
                    livros={this.props.books} 
                    onUpdateBook={this.props.onUpdateBook}
                    />
                </div>
            </div>
            </div>        
        )
    }

}
export default ListBooks