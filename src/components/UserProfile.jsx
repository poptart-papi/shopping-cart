import PropTypes from 'prop-types';

const UserProfile = ({ user, isActive, permissions, onUpdate }) => {
  return (
    <div className="user-profile">
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Status:</strong> {isActive ? 'Active' : 'Inactive'}</p>
      <div>
        <strong>Permissions:</strong>
        <ul>
          {permissions.map((permission, index) => (
            <li key={index}>{permission}</li>
          ))}
        </ul>
      </div>
      {onUpdate && (
        <button onClick={() => onUpdate(user.id)}>
          Update Profile
        </button>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdate: PropTypes.func
};

UserProfile.defaultProps = {
  onUpdate: null
};

export default UserProfile;
