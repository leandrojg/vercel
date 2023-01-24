const express = require (`express`);
const {Server : HttpServer} = require(`http`);
const {Server: IOServer} = require (`socket.io`);

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static(`/public`));

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const messages = [
    
]

app.get(`/`, (req, res) => {
    res.sendFile(`index.html`)
})


io.on(`connection`, socket=>{
    console.log(`Nuevo Cliente Connectado`);
    socket.emit(`messages`, messages)
    socket.on(`new-message`, data =>{
        messages.push(data);
        io.sockets.emit(`messages-push`, data)
    })
})


httpServer.listen(PORT, ()=>{
    console.log(`El Server esta corriendo en ${PORT}`);
})