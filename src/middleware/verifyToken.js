const jwt = require('jsonwebtoken');
const secret_key_Access_Token = process.env.secret_key_Access_Token;

module.exports = (req, res, next) => {
    try{
        // console.log(req.headers['authorization']);
        // const accessToken = req.headers.authorization.split(" ")[1];
        // // console.log(accessToken);
        // const id = jwt.verify(accessToken, secret_key_Access_Token);
        // if(id != null){
        //     req.headers = id;
            next();
        // }
        // else{
        //     return res.status(401).json({
        //         msg:"Token is invalid"
        //     })
        // }
    }
    catch(error){
        return res.status(401).json({
            msg:"Invalid Token"
        })
    }
}