import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [roomSearchQuery, setRoomSearchQuery] = useState('');

  // Simulated API call to check if username exists
  const checkExistingUsername = async () => {
    if (username === 'anish') {
      alert('Username Already Taken');
      return false;
    }
    return true;
  };

  const handleJoinRoom = (roomName) => {
    setSelectedRoom(roomName);
    setShowPasswordModal(true);
  };

  const joinRoom = (roomName, password) => {
    if (password !== 'correctpassword') {
      alert('Wrong Password');
      return;
    }
    setCurrentRoom(roomName);
    setShowPasswordModal(false);
  };

  const loadRooms = async () => {
    // Simulated list of available rooms
    setAvailableRooms(['General', 'Random', 'Gaming']);
  };

  const sendMessage = () => {
    if (!newMessage) return;
    setMessages([...messages, { sender: username, content: newMessage }]);
    setNewMessage('');
  };

  const filteredRooms = availableRooms.filter((room) =>
    room.toLowerCase().includes(roomSearchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Chat App</h1>
      </div>

      {/* Username Input */}
      {!username && (
        <div className="p-4">
          <h3>Enter Username</h3>
          <input
            type="text"
            placeholder="Your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
          />
          <button
            onClick={async () => {
              const isValid = await checkExistingUsername();
              if (isValid) {
                loadRooms();
              }
            }}
            className="mt-2 px-4 py-2 bg-blue-600 rounded"
          >
            Continue
          </button>
        </div>
      )}

      {/* Main Content */}
      {username && (
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-1/4 border-r border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-4">Rooms</h2>
            <input
              type="text"
              placeholder="Search rooms..."
              value={roomSearchQuery}
              onChange={(e) => setRoomSearchQuery(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded mb-4"
            />
            {filteredRooms.map((room) => (
              <div
                key={room}
                onClick={() => handleJoinRoom(room)}
                className="p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 mb-2"
              >
                {room}
              </div>
            ))}
          </div>

          {/* Chat Area */}
          {currentRoom && (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">{currentRoom}</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <p>No messages yet. Start the conversation!</p>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                      <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 border-t border-gray-700">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="w-full p-2 bg-gray-800 rounded"
                />
                <button
                  onClick={sendMessage}
                  className="mt-2 px-4 py-2 bg-blue-600 rounded"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-4 rounded">
            <h3>Enter Room Password</h3>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 bg-gray-800 rounded mt-2"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-700 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => joinRoom(selectedRoom, 'correctpassword')}
                className="px-4 py-2 bg-blue-600 rounded"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}