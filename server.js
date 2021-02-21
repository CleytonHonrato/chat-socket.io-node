const express = require('express');
const path = require('path');

const app = express();

// vai definir o protocolo http e webSocket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// definição da pasta onde ira ficar os arquivos publicos da aplicação
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname,'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
    console.log('testando api');
    res.sendFile('index.html');
})

let message = [];

io.on('connection', (socket) => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.on('sendMessage', (data) => {
        message.push(data);
        socket.broadcast.emit('receiveMessage', data);
    });

    
});

server.listen(3000, function(){
    console.log('Servidor rodando em: http://localhost:3000')
});