const express = require("express")
const server = express()

// Configurar pasta publica
server.use(express.static("public")) // para enxergar tudo da pasta public


// Utilizando Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar caminhos da minha aplicacao
// Pagina inicial
// req = requisicao
// res = resposta
server.get("/", (req, res) => { // GET eh um verbo HTTP
    return res.render("index.html", { title: "Um titulo"})
} )

server.get("/create-point", (req, res) => { // GET eh um verbo HTTP
    return res.render("create-point.html")
} )

server.get("/search", (req, res) => { // GET eh um verbo HTTP
    return res.render("search-results.html")
} )

// Ligar o servidor
server.listen(3000)