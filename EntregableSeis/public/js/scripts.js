
let userEmail;
let socket= io({
    autoConnect:false
})


const productForm = $('#productForm')
const productViewContainer = $('#productViewContainer')
const chatForm = $('#chatForm')
const chatContainer = $('#chatContainer')


class Usuario{
  constructor(email,nombre){
      this.email=email ;
      this.nombre=nombre;        
  }
}

let oUsuarioSession
if( sessionStorage.getItem('UsuarioschatForm')){     
    oUsuarioSession = JSON.parse( sessionStorage.getItem('UsuarioschatForm') )
}else{
    oUsuarioSession = []
    sessionStorage.setItem('UsuarioschatForm',JSON.stringify(oUsuarioSession))
}

if(oUsuarioSession==''){     
  chatForm[0][0].disabled = false;

  Swal.fire({
    title: 'Identifícate',
    input: 'email',
    inputLabel: 'Tu dirreccion de email',
    inputPlaceholder: 'Ej: juan@perez.com',
    text: "Ingresa el usuario para identificarte en el chat",
    allowOutsideClick: false,
    allowEscapeKey: false,
    })
    .then(result => {
        sessionStorage.setItem('UsuarioschatForm',JSON.stringify(new Usuario(result.value)))
        chatForm[0][0].value = result.value;
        chatForm[0][0].disabled = true;

        socket.io.opts.query = {email: result.value };
        socket.disconnect();
        socket.connect();

        userEmail = result.value
    });



}
else{
  oUsuarioSession = JSON.parse( sessionStorage.getItem('UsuarioschatForm') )
  chatForm[0][0].value = oUsuarioSession.email;
  chatForm[0][0].disabled = true;
  socket.connect()
  userEmail = oUsuarioSession.email
}


function CerrarSeccionButton() {
  oUsuarioSession = JSON.parse( sessionStorage.getItem('UsuarioschatForm') )
  sessionStorage.removeItem('UsuarioschatForm')
  socket.emit('disconnection', {email:oUsuarioSession.email})
  socket.disconnect();
  location.reload()
}

$(function () {

  socket.on('socketConnected', () => {
    socket.emit('productListRequest')
    socket.emit('chatMessagesRequest')
  })

      productForm.submit((event) => {
        event.preventDefault()

        const newProduct = {
          title: productForm[0][0].value,
          price: productForm[0][1].value,
          thumbnail: productForm[0][2].value,
        }

        socket.emit('addNewProduct', newProduct)
        productForm.trigger('reset')
      })

      socket.on('updateProductList', productListHandler)

      async function productListHandler(allProducts) {
        const productLayout = await fetch('layouts/productView.hbs')
        const layoutText = await productLayout.text()
        const compiledHbsTemplate = Handlebars.compile(layoutText)
        const html = compiledHbsTemplate({ allProducts })
        productViewContainer.empty().append(html)
      }

      chatForm.submit((event) => {
        event.preventDefault()

        const newMessage = {
          email: chatForm[0][0].value,
          messageText: chatForm[0][1].value,
        }
        socket.emit('addNewMessage', newMessage)
        chatForm.trigger('reset')
      })

      socket.on('updateChatRoom', chatRoomHandler)

      async function chatRoomHandler(allMessages) {
        const chatLayout = await fetch('layouts/chatRoom.hbs')
        const layoutText = await chatLayout.text()
        const compiledHbsTemplate = Handlebars.compile(layoutText)
        const html = compiledHbsTemplate({ allMessages })
        chatContainer.empty().append(html)


      }


    socket.on('newConnection', newConnectionHandler)

    async function newConnectionHandler(data) {

      var notification = alertify.notify(`new Connection :  ${data.email} `, 'success', 5, function(){  console.log(`newConnection : ${data.email} `); });
    }

    socket.on('disconnection', disconnectHandler)

    async function disconnectHandler(data) {

      var notification = alertify.notify(`disconnect :  ${data.email} `, 'error', 5, function(){  console.log(`disconnect : ${data.email} `); });
    }

})



