const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/trips', require('./routes/tripRoutes'));


const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
