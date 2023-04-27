const express = require('express');
const WebSocket = require('ws');
const { NlpManager } = require('node-nlp');

const app = express();

// Serve the static files in the public directory
app.use(express.static('public'));

// Create a new instance of the NlpManager
const manager = new NlpManager({ languages: ['en'] });
manager.load();

// // Add training data for the NlpManager
// manager.addDocument('en', 'hello', 'greeting');
// manager.addDocument('en', 'hi', 'greeting');
// manager.addDocument('en', 'hey', 'greeting');
// manager.addDocument('en', 'goodbye', 'goodbye');
// manager.addDocument('en', 'bye', 'goodbye');
// manager.addDocument('en', 'what is your name?', 'name');
// manager.addDocument('en', 'who are you?', 'name');
// manager.addDocument('en', 'what can you do?', 'abilities');
// manager.addDocument('en', 'what are your abilities?', 'abilities');
// manager.addAnswer('en', 'greeting', 'Hello!');
// manager.addAnswer('en', 'greeting', 'Hi there!');
// manager.addAnswer('en', 'greeting', 'Hey!');
// manager.addAnswer('en', 'goodbye', 'Goodbye!');
// manager.addAnswer('en', 'goodbye', 'See you later!');
// manager.addAnswer('en', 'goodbye', 'Bye!');
// manager.addAnswer('en', 'name', 'My name is Chatbot.');
// manager.addAnswer('en', 'abilities', 'I can answer simple questions.');

// // Train the NlpManager
// (async () => {
//   await manager.train();
//   manager.save();
// })();

// Create a new WebSocket server
const server = new WebSocket.Server({ port: 8080 });

// Handle WebSocket connections
server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', async (message) => {
    console.log(`Received message: ${message}`);

    // Use the NlpManager to process the message
    console.log(`${message}`.length);
    var msg = JSON.stringify(message);
    console.log(typeof(msg));
    console.log(msg.length);

    const respo =  await manager.process("en","bye");
    console.log(respo.answer);
    const response = await manager.process("en",`${message}`);

    // Send the response back to the client
    console.log(response.answer);
    socket.send(response.answer);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
