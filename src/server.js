const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db.js")


// Configurar pasta publica
server.use(express.static("public")) // para enxergar tudo da pasta public

// Habilitar o uso do req.body na nossa aplicacao
server.use(express.urlencoded({ extended: true }))

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


// Essa eh a rota que esta recebendo os dados do formulario
server.get("/create-point", (req, res) => { // GET eh um verbo HTTP
    // req.query: Query Strings da nossa url
    // console.log(req.query)

    return res.render("create-point.html")
} )

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulario
    // console.log(req.body)

    // Inserir dados no Banco de Dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) { // nao se pode usar a arrow function "() =>" ao inves de "function ()" pq esta usando o THIS
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)
        
        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => { // GET eh um verbo HTTP

    const search = req.query.search
    if (search == ""){
        // Pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    // Pegar os dados do Banco de Dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        // console.log("Aqui estao seus registros: ")
        // console.log(rows)

        // Total de elementos no Array
        const total = rows.length

        // Mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })

} )

// Ligar o servidor
server.listen(3000)