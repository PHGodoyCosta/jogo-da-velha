const http = require("http")
const events = require("events")
const fs = require("fs")

const host = "127.0.0.1"
const eventos = new events.EventEmitter()
eventos.on("log", () => {console.log("Macaco entrou no sevidor")})
eventos.on("out", () => {console.log("Macaco saiu do servidor")})

const servidor = http.createServer((request, response) => {
    if (request.url == "/") {
        fs.readFile("index.html", (err, file) => {
            if (err) throw err;
            eventos.emit("log")
            response.writeHead(200, {"Content-type":"text/html"})
            response.end(file)
            eventos.emit("out")
        })
    }
})

servidor.listen(process.env.PORT || 80, host, () => {
    console.log("Server is running!")
})