import axios from 'axios'

const jamendo = axios.create({
    baseURL :'https://api.jamendo.com/v3.0',
    params :{
        client_id : process.env.JAMENDO_CLIENT_ID,
        format : 'json'
    }
})

export default jamendo;
