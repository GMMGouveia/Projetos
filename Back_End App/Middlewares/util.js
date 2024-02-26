const jwt = require('jsonwebtoken');
const config = require('../config');
const { promisify } = require('util');

exports.getDecodedToken = async function(token){
   

    let decoded = "";
    try{
        decoded = await promisify(jwt.verify)(token,config.secrets.jwt)
        console.log(decoded);
    } catch(err){
        console.log(err);
       return null; //n conseguiu decodificar o token
   
    }
     return decoded;  
    }

