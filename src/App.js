import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import ".css/app.css";
import "./components/Books.js";

import Button from "react-bootstrap/Button";
import CreateBook from "./components/CreateBook.js";
import "./components/About/About.js";

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
      console.log("createdBook", createdBook);
      this.setState({
        books: [...this.state.books, createdBook.data],
      });
    } catch (error) {
      console.log("We have an error: ", error.response.data);
    }
  };

  deleteBook = async (bookToDelete) => {
    console.log("we here!", bookToDelete);
    try {
      let url = `${SERVER}/books/${bookToDelete._id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(
        (book) => book._id !== bookToDelete._id
      );

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
    let books = this.state.books.map((book) => (
      <Carousel.Item key={book._id}>
        {/* <Carousel.Caption> */}
        <h2>{book.title}</h2>
        <p>{book.description}</p>
        <Button variant="danger" onClick={() => this.deleteBook(book)}>
          Delete Book
        </Button>
        {/* </Carousel.Caption> */}
      </Carousel.Item>
    ));
    return (
      <>
        <section>
          <header>
            <h1>Good Reads</h1>
          </header>
          <main className="carousel-container">
            {this.state.books.length > 0 ? (
              <Carousel>{books}</Carousel>
            ) : (
              <p>The book collection is empty.</p>
            )}
          </main>

          <CreateBook handleBookSubmit={this.handleBookSubmit} />
        </section>
      </>
    );
  }
}

export default App;
