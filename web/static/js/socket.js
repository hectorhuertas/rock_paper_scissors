// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "deps/phoenix/web/static/js/phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("rooms:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  // .receive("ok", resp => { console.log(channel.id(), resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket

let action= $('#action')
let rock= $('#rock')
let paper= $('#paper')
let scissors= $('#scissors')

let played = false

let setAction = new_action => {
  // let new_action = event.target.innerText
  action.text(`${new_action}!`)
}

// Player plays
rock.on('click', event => {
  setAction(event.target.id)
  played = true
})
paper.on('click', event => {
  setAction(event.target.id)
  played = true
})
scissors.on('click', event => {
  setAction(event.target.id)
  played = true
})

// Game loop
let play = () => {
  if (played == false) {
    setRandomAction()
  }
  // action.toggleClass('red')
  console.log(`Jugada: ${action.text()}`) // a convertir en channel.push
  played = false
  // action.toggleClass('red')
}

// Private
let setRandomAction = ()=>{
  let random = Math.floor(Math.random() * 3)
  let actions = ['rock', 'paper', 'scissors']
  let next_action = actions[random]
  setAction(next_action)
}

// Execution
console.log('Start Game')
// setRandomAction()
// window.setInterval(play, 2000)

$('#broadcast').on('click', event =>{
  channel.push("bc", {})
})
$('#state').on('click', event =>{
  channel.push("st", {})
})

channel.on("starter", () => {
  play()
})
