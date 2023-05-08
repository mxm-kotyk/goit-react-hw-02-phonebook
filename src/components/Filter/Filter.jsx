import PropTypes from 'prop-types';

export const Filter = ({ filter, onChange }) => {
  return (
    <div>
      <label>
        Find contacts by name
        <input
          type="text"
          onChange={onChange}
          value={filter}
          name="filter"
          placeholder="Search..."
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
};
