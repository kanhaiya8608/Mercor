
import PropTypes from 'prop-types';

const Collaborators = ({ collaborators }) => {
  return (
    <div className="flex space-x-2">
      {collaborators.map((collaborator, index) => (
        <img
          key={index}
          src={collaborator}
          alt={`Collaborator ${index + 1}`}
          className="w-8 h-8 rounded-full border-2 border-white"
          style={{
            marginLeft: `${index * -4}px`,
            zIndex: collaborators.length - index,
          }}
        />
      ))}
    </div>
  );
};

Collaborators.propTypes = {
  collaborators: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Collaborators;
