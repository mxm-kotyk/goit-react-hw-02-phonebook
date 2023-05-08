import PropTypes from 'prop-types';
import { Component } from 'react';
import uniqid from 'uniqid';
import { Report } from 'notiflix/build/notiflix-report-aio';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = uniqid();
  numberInputId = uniqid();

  handleInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ name: '', number: '' });

    const { name, number } = this.state;

    if (this.props.contacts.some(contact => contact.name.includes(name))) {
      Report.info(`${name} is already in contacts`, '', 'OK', {
        backOverlayClickToClose: true,
      });
      return;
    }
    this.props.onSubmit(name, number);
  };

  render() {
    const { name, number } = this.state;
    const { nameInputId, numberInputId, handleInput, handleSubmit } = this;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor={nameInputId}>Name</label>
          <input
            onChange={handleInput}
            value={name}
            type="text"
            name="name"
            id={nameInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor={numberInputId}>Number</label>
          <input
            onChange={handleInput}
            value={number}
            type="tel"
            name="number"
            id={numberInputId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
