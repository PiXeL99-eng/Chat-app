# Chat Application

Chit-Chat is a web-app that allows you to engage in text messaging, group messaging, and image sharing with your friends and colleagues in real-time. The app consists of a frontend built with React.js, a WebSocket server using Socket.io and Node.js, and an API created with Node.js, MongoDB, and Express.js.

## Video Demo

Click on the image below to watch the demo video on Youtube. ⬇
[![Watch the video](https://img.youtube.com/vi/tS2S6GHAja0/0.jpg)](https://youtu.be/tS2S6GHAja0)

## Live Website

To see the app in action, check out the live demo [here](https://chat-app-flame-three.vercel.app/).

The API and Socket Server are deployed on Render.
The Frontend is deployed on Vercel.

## Features

- Real-time text messaging: Instantly send and receive text messages in real-time with other users.
- Group messaging: Create chat groups to have conversations with multiple users simultaneously.
- Image sharing: Share images with other users to express yourself better.
- User-friendly interface: Intuitive and visually appealing design for a seamless chatting experience.


## Installation

To set up the chat application locally, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/PiXeL99-eng/Chat-app.git
cd Chat-app
```

2. Install the required dependencies for the frontend:

```bash
cd frontend
npm install
```

3. Install the required dependencies for the WebSocket server:

```bash
cd ../socket
npm install
```

4. Install the required dependencies for the API:

```bash
cd ../api
npm install
```

5. Configure MongoDB and ImageKit for the API:

    Make sure you have MongoDB installed and running on your machine.
    Create an account on Image Kit and get your access keys.
    Create a .env file in the api directory and provide the necessary environment variables:

```bash
MONGO_URL = your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY = your_image_kit_public_key
IMAGEKIT_PRIVATE_KEY = your_image_kit_private_key
IMAGEKIT_URL_ENDPOINT = your_image_kit_url_endpoint
```


6. Configure ImageKit, API url, and Socket Server on Frontend:

    Get the public key and URL endpoint of your ImageKit account.
    Note the localhost address at which your Socket Server and API are running.
    Create a .env file in the frontend directory and provide the necessary environment variables:

```bash
REACT_APP_URL_ENDPOINT = your_image_kit_url_endpoint
REACT_APP_PUBLIC_KEY = your_image_kit_public_key
REACT_APP_API_URL = your_localhost_api_url          # http://localhost:8800
REACT_APP_SOCKET_URL = your_localhost_socket_url # ws://localhost:8900
```

7. Start the API, frontend, and WebSocket server

- Start the API server:
```bash
cd api
npm run start
```

- Start the WebSocket server
```bash
cd socket
npm run start
```

- Start the React app
```bash
cd frontend
npm run start
```

8. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the chat application.


## Technologies Used

- Frontend
  - React.js
  - Socket.io Client
  - Material UI

- WebSocket and API
  - Node.js
  - Express.js
  - Socket.io
  - MongoDB (with Mongoose)

## Folder Structure

The project is organized into the following directories:

    Chat-app/
    ├── frontend                # Frontend codebase
    ├── socket                  # WebSocket server codebase
    ├── api                     # API server codebase
    ├── LICENSE                 # License used
    └── README.md               # Project documentation (you are here!)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
