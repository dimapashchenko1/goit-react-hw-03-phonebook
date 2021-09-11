import { Component } from "react";
import ContactList from "./components/ContactLIst/ContactList";
import { v4 as uuidv4 } from "uuid";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import css from "./App.css";
import "../node_modules/modern-normalize/modern-normalize.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: uuidv4(), name: "Rosie Simpson", number: "459-12-56" },
      { id: uuidv4(), name: "Hermione Kline", number: "443-89-12" },
      { id: uuidv4(), name: "Eden Clements", number: "645-17-79" },
      { id: uuidv4(), name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parseContacts = JSON.parse(contacts);
    // console.log(this.setState);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    let duplicate = this.state.contacts.find(
      (contact) => contact.name === name
    );

    if (duplicate) {
      alert(` Контакт ${name} уже существует!`);
    } else {
      const contact = {
        id: uuidv4(),
        name,
        number,
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { filter } = this.state;
    const VisibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1 className={css}>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2 className={css}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={VisibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
