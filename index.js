require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const flipCardRoutes = require('./routes/flipCardRouter');
const cors = require('cors');

// Add 3 origin links in cors


const app = express();

const corsOptions = {
    origin: ['https://frontend-one-sooty-63.vercel.app', 'https://frontend-devaryan77s-projects.vercel.app', 'https://frontend-git-master-devaryan77s-projects.vercel.app', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/flipcards', flipCardRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:4000');
});
