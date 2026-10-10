import User from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { auth } from "../lib/auth.js";

const verifyJwt = asynchandler(async(req, res, next) => {
  try {
    const authHeader = req.header("Authorization") || "";
    const token = req.cookies?.accessToken || (authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader) || req.cookies?.["better-auth.session_token"];

    if (!token && !req.cookies?.session_token) {
      throw new ApiError(401, "unauthorized request");
    }

    // 1. First attempt: standard JWT verification
    if (token) {
      try {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'dev_access_token_secret';
        const decodedToken = jwt.verify(token, accessTokenSecret);
        const user = await User.findById(decodedToken?._id).select("-password");
        if (user) {
          req.user = user;
          return next();
        }
      } catch (jwtErr) {
        // Not a standard JWT; proceed to Better Auth session verification
      }
    }

    // 2. Second attempt: Better Auth session verification
    const sessionRes = await auth.api.getSession({
      headers: req.headers,
    }).catch(() => null);

    if (sessionRes?.user) {
      let user = await User.findOne({ email: sessionRes.user.email });
      if (!user) {
        try {
          user = await User.create({
            fullname: sessionRes.user.name || "SyncTune User",
            email: sessionRes.user.email,
            password: "oauth_google_user_no_password",
            avatar: sessionRes.user.image,
            role: "User",
          });
        } catch {
          user = await User.findOne({ email: sessionRes.user.email });
        }
      }

      if (user) {
        req.user = user;
        return next();
      }
    }

    throw new ApiError(401, "invalid or expired token");
  } catch (error) {
    throw new ApiError(401, error.message || "invalid or expired token");
  }
});

export { verifyJwt };
