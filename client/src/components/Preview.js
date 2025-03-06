import React from 'react';

const Preview = ({ html }) => {
  return (
    <iframe
      title="preview"
      srcDoc={html}
      style={{ width: '100%', height: '500px', border: '1px solid black' }}
    />
  );
};

export default Preview;