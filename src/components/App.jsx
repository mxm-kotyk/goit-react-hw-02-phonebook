import { Component } from 'react';
import uniqid from 'uniqid';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { Wrapper, MainTitle, SecondaryTitle } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = (name, number) => {
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          id: `${uniqid()}`,
          name,
          number,
        },
      ],
    }));
  };

  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = e => {
    const contactId = e.currentTarget.id;

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts.filter(contact => contact.id !== contactId),
      ],
    }));
  };

  render() {
    const { addContact, handleInput, deleteContact, filterContacts } = this;
    const { filter, contacts } = this.state;
    const filteredContacts = filterContacts();

    return (
      <Wrapper>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm onSubmit={addContact} contacts={contacts} />

        <SecondaryTitle>Contacts</SecondaryTitle>
        <Filter filter={filter} onChange={handleInput} />
        <ContactList contacts={filteredContacts} onClick={deleteContact} />
      </Wrapper>
    );
  }
}
