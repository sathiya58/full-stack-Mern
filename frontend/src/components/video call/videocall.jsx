// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ZoomIntegration from './ZoomIntegration'; // Ensure the path is correct for your ZoomIntegration component

const VideoCall = ({ meetingNumber, passcode, userName }) => {
  const [isCallActive, setCallActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]); // State to hold chat messages
  const [currentMessage, setCurrentMessage] = useState(''); // State for current message input

  // Handle starting the call
  const handleStartCall = () => {
    setCallActive(true);
  };

  // Handle ending the call
  const handleEndCall = () => {
    setCallActive(false);
    if (intervalId) {
      clearInterval(intervalId); // Cleanup interval if the call ends
    }
  };

  // Add a new message to chat
  const handleSendMessage = () => {
    if (currentMessage.trim() !== '') {
      setChatMessages([...chatMessages, { user: userName, message: currentMessage }]);
      setCurrentMessage(''); // Clear input after sending
    }
  };

  // Setting up intervals if necessary and clean up when call ends
  useEffect(() => {
    if (isCallActive) {
      const id = setInterval(() => {
        console.log('Interval running while call is active');
      }, 1000); // Adjust interval timing as required
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId); // Clean up interval when call ends
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Cleanup if component unmounts
      }
    };
  }, [isCallActive, intervalId]); // Ensure intervalId and isCallActive are in the dependency array

  return (
    <div className="video-call-container">
      <h2>Video Call for {userName}</h2>
      {!isCallActive ? (
        <button
          onClick={handleStartCall}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Start Video Call
        </button>
      ) : (
        <div>
          <ZoomIntegration meetingNumber={meetingNumber} passcode={passcode} />
          <button
            onClick={handleEndCall}
            className="bg-red-500 text-white p-2 rounded-md mt-4"
          >
            End Call
          </button>
        </div>
      )}

      {!isCallActive && <p>Waiting for the meeting to start...</p>}

      {isCallActive && (
        <div className="chat-container mt-4">
          <h3>Chat</h3>
          <div className="chat-box border p-4 h-32 overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.user}:</strong> {msg.message}
              </div>
            ))}
          </div>

          <div className="chat-input mt-2 flex">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              className="flex-1 p-2 border rounded-md"
              placeholder="Type your message"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 text-white p-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

VideoCall.propTypes = {
  meetingNumber: PropTypes.string.isRequired,
  passcode: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default VideoCall;
