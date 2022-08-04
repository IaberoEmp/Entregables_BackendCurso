
import express from 'express';
import { Server } from 'socket.io';
import {__dirname,___dirname} from './utils.js';
import productsRouter from './routes/products.router.js';
import chatMessagesRouter from './routes/chatMessages.router.js';


const app = express();

const PORT =   process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', (error) => console.log(`Server error: ${error}`))
const io = new Server(server);


app.set('views', 'src/views')
app.use(express.static(___dirname+'/public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', (req, res) => {
  try {
    res.sendFile(process.cwd() + '/public/index.html')
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
})

io.on('connection', async (socket) => {
  socket.emit('socketConnected')
  const email = socket.handshake.query.email;
  socket.broadcast.emit('newConnection',{ email: email});

    socket.on('productListRequest', async () => {
      const allProducts = await productsRouter.getAllProduct()
      socket.emit('updateProductList', allProducts)
    })

    socket.on('addNewProduct', async (newProduct) => {
      await productsRouter.addNewProduct(newProduct)
      const allProducts = await productsRouter.getAllProduct()
      io.sockets.emit('updateProductList', allProducts)
    })

    socket.on('chatMessagesRequest', async () => {
      const allMessages = await chatMessagesRouter.getAllMessages()
      socket.emit('updateChatRoom', allMessages)
    })

    socket.on('addNewMessage', async (newMessage) => {
      await chatMessagesRouter.addNewMessage(newMessage)
      const allMessages = await chatMessagesRouter.getAllMessages()
      io.sockets.emit('updateChatRoom', allMessages)
    })

    socket.on('disconnection', async(data) => {
      socket.broadcast.emit('disconnection', { email: data.email});
    })

})

