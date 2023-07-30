const jwt = require('jsonwebtoken');
const secret_key_Access_Token = process.env.secret_key_Access_Token;
const secret_key_Refresh_Token = process.env.secret_key_Refresh_Token;

const generateAccessToken = (id) => {
    const accessToken = jwt.sign({
        id: id
    },
    secret_key_Access_Token,
    {
        expiresIn: "24h"
    }
    )
    console.log(accessToken);
    return accessToken;
}

const generateRefreshToken = (id) => {
    const refreshToken = jwt.sign({
        id: id
    },
    secret_key_Refresh_Token,
    {
        expiresIn: "1y"
    }
    )
    console.log(refreshToken);
    return refreshToken;
}

const resetToken = (req, res) => {
    const resetAccessRefreshToken = async () => {
        let refreshToken = req.body.refreshToken;
        const verify = jwt.verify(refreshToken,secret_key_Refresh_Token, (err, payload) => {
            if(err){
                return res.status(401).json({
                    msg: "Doesn't get Authorized, please do login again",
                    jwtMsg: err.message
                })
            }
            else{
                const accessToken = generateAccessToken(payload.id);
                refreshToken = generateRefreshToken(payload.id);

                res.status(200).json({
                    message: "tokens generated successfully",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                })
            }
        });
    }

    resetAccessRefreshToken();
}

module.exports = {generateAccessToken, generateRefreshToken, resetToken};