import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


class BookFormModal extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     title: '',
  //     description: '',
  //     available: false
  //   };
  // }
  // handleInputChange = (event) => {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log('did we get here??', event)
    // const book = {
    //   title: event.target.title.value,
    //   description: this.state.description,
    //   available: this.state.available
    // };
    this.props.handleBookSubmit(event);
    // this.setState({
    //   title: '',
    //   description: '',
    //   available: false
    // });
    this.props.onHide();
  }
  render() {
    // console.log( this.props.handleBookSubmit )
    return (
      <Container className='mt-5'>
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Check type="checkbox" label="available" />
              </Form.Group>
              {/* <Button variant="outline-secondary" onClick={this.handleShowModal}>Add Book</Button> */}
              <Button variant="outline-secondary" type="submit">Add Books</Button>
              {/* <BookFormModal show={this.state.showModal} onSubmit={this.handleSubmit} onHide={this.handleHideModal} /> */}
            </Form>
            
          </Modal.Body>

          {/* <Button variant="outline-secondary" onClick={
            () => this.handleShowModal()}>Add Book</Button>
          <BookFormModal
            show={this.state.showModal}
            onSubmit={this.handleSubmit}
            onHide={this.handleHideModal}
          /> */}
        </Modal>
      </Container >
    )

  }
}

export default BookFormModal;