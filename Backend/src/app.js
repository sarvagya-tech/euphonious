import express from 'express'
import cookieparser from 'cookie-parser'
import cors from 'cors'

const app = express();

app.use(cookieparser());
app.use(cors({
      origin: 'http://localhost:5173',
      credentials : true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


import userRouter from './routes/user.routes.js';
import songRouter from './routes/songs.routes.js';

app.use("/api/v1/songs",songRouter);

app.use("/api/v1/users",userRouter);

app.use((err, req, res, next) => {
      if (res.headersSent) {
            return next(err);
      }

      const statusCode = err.statuscode || err.statusCode || err.status || 500;
      const message = err.message || "Internal Server Error";

      return res.status(statusCode).json({
            success: false,
            message,
            errors: err.error || [],
      });
});


export {app};
