# NexusChat

## Introduction
The NexusChat is a blockchain-powered messaging platform built using the Calimero SDK. It enables users to create chat and voice rooms, send messages, and manage communication securely and transparently. With built-in user authentication and room encryption, this smart contract ensures privacy while leveraging decentralized technology for communication.

## Features
### User Management:
- Register users with a unique username and wallet address.
- Retrieve usernames and wallet addresses.

### Room Management:
- Create chat or voice rooms with password protection.
- Join rooms securely using a password.
- Retrieve room details and list available rooms.
- Delete rooms (only by the creator).
- View users in a room.

### Messaging:
- Send messages in a room (only by authorized users).
- Retrieve message history for a room.

### Signaling for Voice Rooms:
- Send signaling messages between users in a room for WebRTC-based voice communication.

## Contract Details
### User Registration
- Users register with a unique username and wallet address.
- Prevents duplicate usernames and wallet registrations.

### Room Creation
- Users create rooms with a specified type (Chat or Voice) and a password.
- Each room has a creator, user list, and message history.

### Joining a Room
- Users must provide the correct password to join a room.
- Upon joining, the user gets added to the room’s user list.

### Messaging
- Users in a room can send messages.
- Messages include sender, content, and timestamp.

### Signaling Messages
- Enables peer-to-peer voice communication via signaling messages.
- Only users in the room can exchange signaling messages.

### Leaving and Deleting Rooms
- Users can leave a room at any time.
- Room creators can delete rooms.

## Functions Overview
### User Functions
- `register_user(username: String, wallet_address: String) -> bool`: Register a new user.
- `get_username(wallet_address: String) -> Option<String>`: Get a username from a wallet address.
- `get_wallet_address(username: String) -> Option<String>`: Get a wallet address from a username.

### Room Functions
- `create_room(name: String, password: String, creator: String, room_type: RoomType) -> bool`: Create a new room.
- `join_room(room_name: String, user: String, password: String) -> bool`: Join a room with a password.
- `leave_room(room_name: String, user: String) -> bool`: Leave a room.
- `delete_room(room_name: String, wallet_address: String) -> bool`: Delete a room (only by creator).
- `get_room_info(room_name: String) -> Option<(String, RoomType, String)>`: Get details about a room.
- `list_rooms() -> Vec<String>`: Get a list of all rooms.
- `get_room_users(room_name: String) -> Vec<String>`: Get a list of users in a room.
- `get_room_messages(room_name: String, user: String) -> Vec<(String, String, u64)>`: Retrieve messages from a room.

### Messaging Functions
- `send_message(room_name: String, sender: String, content: String) -> bool`: Send a message in a room.
- `send_signaling(room_name: String, sender: String, receiver: String, content: String) -> bool`: Send a signaling message for voice communication.

## Events
- `RoomCreated { name: String }`
- `UserJoinedRoom { room: String, user: String }`
- `MessageSent { room: String, sender: String, content: String }`
- `RoomDeleted { name: String }`
- `UserRegistered { username: String, wallet_address: String }`
- `SignalingMessage { room: String, sender: String, receiver: String, content: String }`

## Security Considerations
- Users should only join rooms they trust, as messages are stored on-chain.
- Room passwords should be kept private to prevent unauthorized access.
- Smart contract security should be audited before deployment.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Support
For any inquiries or support, please open an issue on the GitHub repository or contact us via email.

## Links
- GitHub Repository: [Decentralized Chat](#)
- Demo Video: [Watch Here](#)
- Project Website: [Visit Here](#)

