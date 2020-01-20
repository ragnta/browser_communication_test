const Server = require('socket.io');
const fs = require('fs');
const io = new Server(3000);

io.on("connection",(socket)=> {

    socket.on("incommingMessage", (msg)=> {
        const mess = JSON.parse(msg)
        socket.emit("response", `{"msg":"Hello World", "order": ${mess.order}}`)
    })
    socket.on("result", (msg)=> {
        const mess = JSON.parse(msg)
        fs.appendFileSync(`./resultWebSocket.csv`,"Number;DeltaTime\n"+Object.entries(mess).sort((a,b)=> Number(a[0]) - Number(b[0])).map(row => row.join(";")).join("\n"));
    })
});