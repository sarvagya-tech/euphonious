import {Router} from "express"
import { loginUser, registerUser,logOutUser } from "../controller/user.controller.js";
import { upload } from "../middleware/mullter.middleware.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const userRouter = Router()

userRouter.route("/register").post(upload.fields([{
   name : "avatar",
   maxCount : 1
}]),
    
    registerUser)
userRouter.post("/login",loginUser)

userRouter.post("/logout",verifyJwt,logOutUser)

userRouter.get("/me",verifyJwt,(req,res)=>{
    res.json({
        user : req.user
    });
});
export default userRouter;
