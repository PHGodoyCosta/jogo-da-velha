const http = require("http")
const events = require("events")
const express = require("express")

const app = express()
const servidor = http.createServer(app)
const host = "127.0.0.1"
const eventos = new events.EventEmitter()
eventos.on("log", () => {console.log("Macaco entrou no sevidor")})
eventos.on("out", () => {console.log("Macaco saiu do servidor")})

app.set("view engine", "html")
app.use(express.static(__dirname))

app.get("/", (request, response) => {
    response.status(200)
    eventos.emit("log")
    response.sendFile(__dirname + "/index.html")
    eventos.emit("out")
})

servidor.listen(process.env.PORT || 80, host, () => {
    console.log("Server is running!")
})
