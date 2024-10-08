const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(406).json({ error: 'Not authenticated' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = parseInt(decoded.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authorization failed' });
  }
};
