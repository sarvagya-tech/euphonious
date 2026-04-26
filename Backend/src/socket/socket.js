import Message from "../model/message.model.js";

const initializeSocket = (io)=>{

    io.on('connection',(socket)=>{
      
        console.log('user connected:', socket.id);
        let userRoom = null
        let userIdStored = null

        socket.on('joinRoom',(data)=>{

            userRoom = data.roomCode;
            userIdStored = data.userId;
            socket.join(data.roomCode)
            io.to(data.roomCode).emit('userJoind',{
                userId : data.userId,
                message : 'user joined the room'
            })

        })

        socket.on('sendMessage',(data)=>{
            io.to(data.roomCode).emit('newMessage',{
              userId : data.userId,
              message : data.message,
              time : new Date()
            })
        })
        socket.on('playSong',(data)=>{
            socket.to(data.roomCode).emit('playSong',{
                songUrl:data.songUrl,
                position: data.position,
                timestamp: Date.now()
            })
        })
        socket.on('pauseSong',(data)=>{
            socket.to(data.roomCode).emit('pauseSong',{
                position : data.position
            })
        })
        socket.on('seekSong',(data)=>{
            socket.to(data.roomCode).emit('seekSong',{
                position : data.position
            })
        })
        socket.on('skipSong',(data)=>{
            io.to(data.roomCode).emit('skipSong',{
                songUrl : data.songUrl
            })

        })
        socket.on('leaveRoom',(data)=>{
            socket.leave(data.roomCode);
            io.to(data.roomCode).emit('userLeft',{
                userId : data.userId,
                message : `${data.userId}left the room`

            })
        })
       socket.on('disconnect', () => {
            console.log('user disconnected:', socket.id)
            if(userRoom){
                io.to(userRoom).emit('userLeft', {
                    userId: userIdStored
                })
            }
    })
})
}

export {initializeSocket}
