import React from 'react';
import { Link } from 'react-router-dom';

function Lobby() {
  const codeBlocks = ['Async Case', 'Promise Example', 'Callback Hell', 'Event Loop'];

  return (
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((block, index) => (
          <li key={index}>
            <Link to={`/code/${index}`}>{block}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;
