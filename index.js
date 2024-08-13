require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const flipCardRoutes = require('./routes/flipCardRouter');
const cors = require('cors');

// Add 3 origin links in cors

const corsOptions = {
  origin: ['http://localhost:3000', 'https://soft-sfogliatella-292982.netlify.app', 'https://flipper-cards-seven.vercel.app'],
  credentials: true,
};

// const corsOptions = {
//   origin: 'https://soft-sfogliatella-292982.netlify.app',
//   credentials: true,
// };


const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/flipcards', flipCardRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:4000');
});
