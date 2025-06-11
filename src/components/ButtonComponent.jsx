import PropTypes from 'prop-types';

const ButtonComponent = ({ onClick, label, variant, disabled }) => {
  const getButtonClass = () => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    return `${baseClass} ${variantClass}`;
  };

  return (
    <button 
      type="button" 
      onClick={onClick}
      className={getButtonClass()}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

ButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool
};

ButtonComponent.defaultProps = {
  variant: 'primary',
  disabled: false
};

export default ButtonComponent;
