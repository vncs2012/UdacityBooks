import React ,{Component} from 'react'
import './App.css'

class Finalizado extends Component {

  render() {
      return (
          <ol className="books-grid">
          {this.props.livros.filter((f)=> f.shelf ==="read").map((x)=>(
          <li key={x.id} >
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${(x.imageLinks ? x.imageLinks.thumbnail : 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/95b574eb7c6ae80582871d4c4e5998fc/photo-1537292092495-88d055b782a9.jpg')}")` }}></div>
                <div className="book-shelf-changer">
                  <select defaultValue={x.shelf}  onChange={(e) => this.props.onUpdateBook(x,e.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read" >Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{x.title}</div>
              <div className="book-authors">{x.authors}</div>
            </div>
          </li>
        ))} </ol>
        )
    
    }
}

export default Finalizado