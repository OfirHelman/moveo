import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// Connect to the Socket.io server for real-time updates
const socket = io('http://localhost:5001');

function CodeBlock() {
  // Grab the code block ID from the URL
  const { id } = useParams();

  // State to hold the code and whether the user is a mentor
  const [code, setCode] = useState('');
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    // Listen for these events from the server
    socket.on('role', (role) => {
      // Update the mentor state based on the received role
      setIsMentor(role === 'mentor');
    });

    socket.on('codeChange', (newCode) => {
      // Update the code state when a change comes in
      setCode(newCode);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('role');
      socket.off('codeChange');
    };
  }, []);

  // Handle code changes in the textarea
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode); // Update the local state
    socket.emit('codeChange', newCode); // Share the change with others
  };

  // Fetch the initial code block
  useEffect(() => {
    const fetchCodeBlock = async () => {
      try {
        // Replace this with your actual API call to fetch the code
        const dummyCodeBlocks = ['', 'Promise example', 'Callback hell', 'Event loop'];
        setCode(dummyCodeBlocks[id]);
      } catch (error) {
        console.error('Error fetching code block:', error);
      }
    };

    fetchCodeBlock();
  }, [id]);

  // Highlight code syntax when it changes
  useEffect(() => {
    hljs.highlightAll();
  }, [code]);

  return (
    <div>
      <h2>Code Block {id}</h2>
      {/* Show read-only code for mentors */}
      {isMentor && (
        <pre>
          <code className="javascript">{code}</code>
        </pre>
      )}
      {/* Render editable textarea for students */}
      {!isMentor && (
        <textarea
          rows="10"
          cols="50"
          value={code}
          onChange={handleCodeChange}
          placeholder="Make changes here..."
        />
      )}
    </div>
  );
}

// Export the component for use in other parts of the app
export default CodeBlock;
