const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const createToken = (userId) => {
  return jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, { expiresIn: '3d' });
};


exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    const token = createToken(user.id);
    res.cookie('token', token, { httpOnly: true, maxAge: 3*24*3600000 });
    res.status(201).json({ message: 'User created', user });
  } catch (e) {
    if (e.code === 'P2002' && e.meta && e.meta.target === 'User_email_key') {
      res.status(400).json({ error: 'Email already in use' });
    } else {
      res.status(400).json({ error: 'Failed to create user', details: e.message || e });
    }
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    const token = createToken(user.id);
    res.cookie('token', token, { httpOnly: true, maxAge: 3*24*3600000 });
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.json({ message: 'Logged out successfully' });
};
