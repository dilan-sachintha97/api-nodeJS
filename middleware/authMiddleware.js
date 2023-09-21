const jwt = require('jsonwebtoken');


// Authenticate using a JWT token
exports.authenticateToken = (req, res, next) => {
 
    const token = req.headers.authorization;  
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  
  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
        console.log(err);
      return res.status(401).json({ message: 'Authentication failed' });
     
    }
    
    req.user = decodedToken;
    next();
  });
};
