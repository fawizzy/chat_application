const userController = require("../controllers/userController")
const auth = require("../middleware/auth")
const userRoute = require("./indexRoute")

userRoute.post("/registeruser", userController.createUser)
userRoute.post("/login", userController.logIn)
userRoute.get("/checkiflogin",auth, userController.userlogin)
userRoute.get("/allusers",auth, userController.getAllUsers)
module.exports = userRoute
