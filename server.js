const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = [];
let announcements = [];

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Admin Dashboard API!');
});

// Endpoint to get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint to add or update a user
app.post('/users', (req, res) => {
  const user = req.body;
  const existingUserIndex = users.findIndex(u => u.username === user.username);
  if (existingUserIndex !== -1) {
    users[existingUserIndex] = user;
  } else {
    users.push(user);
  }
  res.json({ message: 'User saved successfully' });
});

// Endpoint to delete a user
app.delete('/users/:username', (req, res) => {
  users = users.filter(user => user.username !== req.params.username);
  res.json({ message: 'User deleted successfully' });
});

// Endpoint to get all announcements
app.get('/announcements', (req, res) => {
  res.json(announcements);
});

// Endpoint to add an announcement
app.post('/announcements', (req, res) => {
  const announcement = req.body;
  announcements.push(announcement);
  res.json({ message: 'Announcement added successfully' });
});

// Endpoint to delete an announcement
app.delete('/announcements/:index', (req, res) => {
  announcements.splice(req.params.index, 1);
  res.json({ message: 'Announcement deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

