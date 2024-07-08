const jwt = require('jsonwebtoken');
const JWT_SECERT = "ravinderinotebook";
const fetchuser = (req, res, next) =>{

    //Get the user from the jwt token
    const token = req.header('auth-token');
   // console.log(token);
    if(!token){
        console.log("token error");
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        //console.log(JWT_SECERT);
        const data = jwt.verify(token,JWT_SECERT);
        req.user = data.user;
       // console.log(data);
        next();
    } catch (error) {
        console.log("cache error");
        res.status(401).send({error:"Please authenticate using a valid token"})
    }

}

module.exports = fetchuser