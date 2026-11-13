const { Funcionario, Obra, Material, Movimentacao } = require('./models/rel')
const conn = require('./db/conn')
async function syncDataBase() {
    try{
        await conn.sync({ force: true})
    }catch(err){
        console.error('erro ao sincronizar', err)
    }finally{
        await conn.close()
    }
}

syncDataBase()