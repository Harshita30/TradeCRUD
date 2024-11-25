// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const create = (payload) => {
  
  // Options (optional)
  const options = {
    expiresIn: '1h'  // Token will expire in 1 hour
  };

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);
    console.log('Generated JWT Token:', token);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token generation error' });
  }
};

module.exports = protect;
