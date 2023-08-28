const userModel = require("../models/userModel");
const uuidv4 = require("uuid").v4
const sha1 = require("sha1");
const redisClient = require("../db/redis")

function createUser(req, res){
    const requestBody = req.body || {};  
    const userData = {
        email: requestBody.email || null,
        username: requestBody.username || null,
        password: requestBody.password ? sha1(requestBody.password) : null,
    };

    const requiredFields = [
        "email",
        "username",
        "password"
    ];

    for (const field of requiredFields) {
        if (!userData[field]) {
            res.status(400).json({ error: `Missing ${field}` });
            return;
        }
    }
    let user = new userModel(userData)

    user.save()
    .then((doc)=>{
        res.send(doc)
    })
    .catch((err)=>{
        //console.log(err)
        res.send(err)
        console.log(userData.id)
    })
}

async function userlogin(req, res){
    res.status(201).json({"message": "user loggedin"})
}

async function getUser(key){
    const user  = await redisClient.get(key)
    return user
}

async function logIn(req, res){
    
  
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email){
        res.status(401).json({error: "email missing"})
        return;
    }
    if (!password){
        res.status(401).json({error: "password missing"})
        return;
    }
    const hashed_password = sha1(password)
    
    const user = await userModel.findOne({ email: email, password: hashed_password }).exec();
    if (user){
        const token = uuidv4()
        const key = `auth_${token}`
        res.cookie("session_id", token)
        const user_string = JSON.stringify(user)
        await redisClient.set(key, user_string, 60*60*240)
        res.status(201).json({token: token, user: user.email})
    }else{
        res.status(401).json("user not found")
    }
    
}

async function getAllUsers(req, res){
    let user = res.locals.user
    const users = await userModel.find().exec();
    
    removeObjectById(users, user._id)
    res.send(users)
}


function removeObjectById(arr, id) {
    const index = arr.findIndex(obj => obj._id == id);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

const userController = {
        createUser,
        logIn,
        userlogin,
        getAllUsers,
        getUser
    }
module.exports = userController
