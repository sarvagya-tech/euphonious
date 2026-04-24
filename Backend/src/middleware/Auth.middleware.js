import User from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"

const verifyJwt = asynchandler(async(req,res,next)=>{
  try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
  
      if(!token){
          throw new ApiError(401, "unauthorized request")
      }
  
  const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || 'dev_access_token_secret';
  const decodedToken = jwt.verify(token, accessTokenSecret)
  
  const user = await User.findById(decodedToken?._id).select("-password ");
  
  if(!user){
      throw new ApiError(401, "invalid access token")
  }
  
  req.user = user;
  next();
  } catch (error) {
    throw new ApiError(401, "invalid or expired token");
    
  }



})
export {verifyJwt};
