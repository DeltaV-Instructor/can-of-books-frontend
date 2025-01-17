import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "./css/App.css";
import "./components/Books.js";

import Button from "react-bootstrap/Button";
import CreateBook from "./components/CreateBook.js";
// import About from "./components/About/About.js";
import Header from "./components/Header/Header.js";

let SERVER = process.env.REACT_APP_SERVER;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data,
      });
    } catch (error) {
      console.log("error found: ", error.response.data);
    }
  };

  handleBookSubmit = async (event) => {
    event.preventDefault();
    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
    };
  this.postBook(newBook);
  };

  postBook = async (newBookObject) => {
    try {
      let url = `${SERVER}/books`;
      let createdBook = await axios.post(url, newBookObject);
      this.setState({
        books: [...this.state.books, createdBook.data],
      });
    } catch (error) {
      console.log("We have an error: ", error.response.data);
    }
  };

  deleteBook = async (bookToDelete) => {
    try {
      let url = `${SERVER}/books/${bookToDelete._id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter((book) => book._id !== bookToDelete._id);
      this.setState({
        books: updatedBooks,
      });
    } catch (error) {
      console.log("We have an error: ", error.response.data);
    }
  };

  componentDidMount() {
    this.getBooks();
  }

  render() {
    let books = this.state.books.map((book) => {
      return (
        <Carousel.Item key={book._id}>
          <h2>{book.title}</h2>
          <p className="book-desc">{book.description}</p>
          <Button 
          variant="danger" 
          onClick={() => this.deleteBook(book)}
          className='mb-5'
          >
            Delete Book
          </Button>
        </Carousel.Item>
      );
    });
    return (
      <>
        <Header />
        <section className="section-background">
          <main className="carousel-container">
            {this.state.books.length > 0 ? (
              <Carousel>{books}</Carousel>
            ) : (
              <p>The book collection is empty.</p>
            )}
          </main>
          </section>
          <CreateBook handleBookSubmit={this.handleBookSubmit} />
       
      </>
    );
  }
}

export default App;
