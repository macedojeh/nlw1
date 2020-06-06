// Importar a dependencia do SQLITE3 - VERBOSE eh pra ver mensagens no terminal sempre que aconteecr alguma coisa

const sqlite3 = require("sqlite3").verbose()

// Criar o objeto que ira fazer operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db") // constructor ou classe

module.exports = db // exportar o objeto db
// Utilizar o objeto de banco de dados para nossas operacoes
db.serialize(() => {
    // Criar uma tabela - usa-se crase ` pra fazer quebra de linha, se usar " ou ' vai dar problemas no codigo
    // Com comandos SQL:


    // 1 Criar uma tabela
    // db.run(` 
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    
    // // 2 Inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    
    // const values = [
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim America",
    //     "Numero 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Residuos Eletronicos, Lampadas"
    // ]

    // function afterInsertData(err) { // nao se pode usar a arrow function "() =>" ao inves de "function ()" pq esta usando o THIS
    // if (err) {
    //     return console.log(err)
    // }
    // console.log("Cadastrado com sucesso!")
    // console.log(this)
    // }


    // db.run(query, values, afterInsertData) // tudo passado por referencia


    // 3 Consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function (err, rows) { // * significa todos os campos da tabela
    // if (err) {
    //     return console.log(err)
    // }

    // console.log("Aqui estao seus registros: ")
    // console.log(rows)
    // } )

    // // 4 Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [], function(err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso!")
    // })

})