const express = require('express');
const history = require('connect-history-api-fallback');
const logger = require('morgan');
const cors = require('cors')
const {ami}= require('./asterisk');


const ChanSpy = require("./router/ChanSpy")
const app = express();
const PORT = 2223
app.use(history());
app.use(cors());
app.use(express.json());
app.use(logger('tiny'))
const server = require('http').Server(app)

const io = require("socket.io")(server,{
  cors: {
      origin: true,
      credentials: true,
  },});

  
  ami.on('hangup', function(evt) {
      io.sockets.emit("Hangup", evt);
  });
    

    ami.on('blindtransfer', function(evt) {
      io.sockets.emit("transfer", evt);
    
    });

    ami.on('attendedtransfer', function(evt) {
      io.sockets.emit("transfer", evt);
    });


  ami.on('newstate', function(evt) {
    io.sockets.emit("New_state", evt);
  });


  ami.on('extensionstatus', function(evt) {
    io.sockets.emit("Ext_state", evt);
  });

  io.on("connection", function (socket) {
    console.log("Un cliente se ha conectado");
      //socket.emit("Ext_state", evt);
  socket.on("disconnect", () => {
   console.log("desconectado");
  });

  
  });


app.post('/login',  function(req, res) {
  const {username,password} = req.body

    let validation=false;
    if (username =='admin' && password=="sen31994") validation=true

      res.json({"validation": validation});

  });



app.use("/ChanSpy",ChanSpy)

app.use(express.static(__dirname + '/public'));

server.listen(PORT, () =>{
    console.log(`Servidor iniciado en el puerto: ${PORT}`);
})