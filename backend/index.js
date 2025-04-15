// backend/index.js
// This is the entry point of your backend server

const express = require('express'); // Import express
const app = express(); // Create app
const PORT = 8080; // Define port

// Middleware
app.use(express.json()); // Parse JSON body

// Sample route
app.get('/', (req, res) => {
  res.send('DeFi Inclusion App Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
