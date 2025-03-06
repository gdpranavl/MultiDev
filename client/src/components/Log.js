import React from 'react';

const Log = ({ logs }) => {
  return (
    <div className="log">
      <h2>Logs</h2>
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
};

export default Log;