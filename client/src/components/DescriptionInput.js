import React from 'react';

const DescriptionInput = ({ description, onDescriptionChange, onSubmit }) => {
  return (
    <div>
      <textarea
        value={description}
        onChange={onDescriptionChange}
        placeholder="Describe your web page, e.g., 'Create a page with a button that shows an alert when clicked.'"
        style={{ width: '100%', height: '200px' }}
        />
      <button onClick={onSubmit}>Generate</button>
    </div>
  );
};

export default DescriptionInput;