import PropTypes from 'prop-types';
import { Contact } from './Contact/Contact';

export const ContactList = ({ contacts, onClick }) => {
  return (
    <div>
      <ul>
        {contacts.map(({ id, name, number }) => {
          return (
            <Contact
              key={id}
              id={id}
              name={name}
              number={number}
              onClick={onClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
