const redisClient = require("../db/redis")

const auth = async (req, res, next)=>{
    try {
        const token = req.cookies.session_id
        const key = `auth_${token}`
        //const key = `auth_${req.params ? req.params.id : null}`;
        let user = await redisClient.get(key)
        user = JSON.parse(user)
        if (!user){
            res.status(401).json({message: "unauthorized user"})
        }else{
            res.locals.user = user;
            next()
        }     
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = auth