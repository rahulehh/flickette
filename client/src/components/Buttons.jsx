import Button from "@mui/material/Button";
import PropTypes from "prop-types";

export const EditButton = ({ children, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick} className="edit-button">
      {children}
    </Button>
  );
};

EditButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const SaveButton = ({ children, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick} className="save-button">
      {children}
    </Button>
  );
};

SaveButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const DeleteButton = ({ children, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick} className="delete-button">
      {children}
    </Button>
  );
};

DeleteButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
