const jwt = require('jsonwebtoken');
const util = require('./util');


module.exports = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await util.getDecodedToken(token);
      req.userData = { email: decodedToken.email, permissions: decodedToken.permissions, id: decodedToken.id };
      if(req.userData.permissions === 'tutor' || req.userData.permissions === 'teacher'){
          next();
      }
   
    } catch (error) {
      res.status(401).json({ message: "You are Not a Tutor or Teacher" });
    }
  }