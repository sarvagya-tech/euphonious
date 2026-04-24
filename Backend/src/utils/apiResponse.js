class ApiResponse{
    constructor(
       statuscode,
       data,
       message = "succes",
    )
    {
         this.statuscode = statuscode,
         this.message = message,
         this.data = data
        
    }
}

export{ApiResponse}