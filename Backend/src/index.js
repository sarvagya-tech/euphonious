
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import connectdb from "./db/index.js";

import { app } from "./app.js";


connectdb()

.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server running on ${process.env.PORT}`)
    })
    })
.catch((error)=>{
    console.log("connection failed",error)
    process.exit(1)
    
})

