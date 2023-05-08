import PropTypes from 'prop-types';

export const Contact = ({ id, name, number, onClick }) => {
  const normalizedNumberLink = `tel:${number.replace(/\D/g, '')}`;
  return (
    <li>
      <p>
        {name}: {number}
      </p>
      <a href={normalizedNumberLink}>Call</a>
      <button type="button" onClick={onClick} id={id}>
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
