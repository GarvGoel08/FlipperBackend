require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const flipCardRoutes = require('./routes/flipCardRouter');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};


const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/flipcards', flipCardRoutes);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
