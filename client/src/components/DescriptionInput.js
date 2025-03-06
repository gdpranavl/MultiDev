import React from 'react';

const DescriptionInput = ({ description, onDescriptionChange, onSubmit }) => {
  return (
    <div className="input-container">
      <h2>Input</h2>
      <textarea
        value={description}
        onChange={onDescriptionChange}
        placeholder="Enter your project description"
      />
      <button onClick={onSubmit}>Generate</button>
    </div>
  );
};

export default DescriptionInput;