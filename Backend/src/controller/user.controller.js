import {asynchandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/apiError.js"
import User from "../model/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse.js"



const genrateAccesstkenAndRefreshtoken = async(userId)=>{

try {
        // ❓ Ye function kya karta hai (1 line me)
        // 👉 Given a userId, ye function:
        // user ko DB se nikalta hai
        // access token generate karta hai
        // refresh token generate karta hai
        // refresh token DB me save karta hai
        // dono tokens return karta hai
        
                const user = await User.findById(userId);
        
               const accessToken =  user.generateAccessToken();
               const refreshToken =  user.generateRefreshToken();
        
                user.refreshToken = refreshToken;
        
              await user.save({validateBeforeSave : false})
        
                return {accessToken,refreshToken}
        }
catch (error) {
        throw new ApiError(500,"something went wrong while genrating access and refresh token")
        
}
}

const registerUser = asynchandler(async (req,res)=>{
    
        // res.status(200).json({message : hello});

        const { password, email, fullname } = req.body

         if (![fullname, password, email].every((field) => typeof field === "string" && field.trim() !== "")) {
                throw new ApiError(400,"fullname, email and password are required")
        }

        const existedUser = await User.findOne({email})

if(existedUser){
        throw new ApiError(409,"user or email alredy existed");
}

const  avatarlocalPath = req.files?.avatar?.[0]?.path;

if(!avatarlocalPath){
        throw new ApiError(400,"avatar file required");
}

const avatar = await uploadOnCloudinary(avatarlocalPath);

if(!avatar){
        throw new ApiError(400,"avtar is required");
}


const user = await User.create({
        fullname,
        avatar : avatar.url,
        email,
        password,
       
})

const createdUser = await User.findById(user._id).select(
       "-password -refreshToken"
)

  if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
         new ApiResponse(201,createdUser,"register of user succesfull")
    )    
})

 // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const loginUser = asynchandler(async(req,res)=>{

        const {email,password} = req.body;
        
        if(!email || !password){
               throw new ApiError(400, "email and password are required");
        }

        const user = await User.findOne({email})

        if(!user){
               throw new ApiError(404, "user not found");
        }

        const ispasswordValid = await user.isPasswordCorrect(password);

        if(!ispasswordValid){
               throw new ApiError(401, "invalid password");

        }

        const {accessToken,refreshToken} =
         await genrateAccesstkenAndRefreshtoken(user._id);

        
        const loggedInuser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
        };

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
                new ApiResponse(
                        200,
                        {
                         user : loggedInuser, accessToken, refreshToken
                        },
                        "user logged in "
                )
        );
    })

     const logOutUser = asynchandler(async (req,res) => {
       await User.findByIdAndUpdate(req.user._id,
        {
                $unset :{
                           refreshToken : 1
                }
        },{
                new : true
        }
        );

        const options = {
                httpOnly : true,
                secure : process.env.NODE_ENV === "production",
                sameSite: "lax",
        }

        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"user logged out"))

     });


export {logOutUser,registerUser,loginUser};
