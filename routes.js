
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()

routes.get('/', async (req, res)=>{
   try{
        const { recordset } =  await pool.query`select * from Agendamentos`
        return res.status(200).json(recordset)
   }
   catch(error){
        return res.status(501).json('ops...algo deu errado')
   }
})

routes.post('/agendamento/novo', async (req, res)=>{
    try{
        const { data_agendamento, horario, reserva } = req.body;
        await pool.query`insert into Agendamentos values(${data_agendamento},${horario},${reserva})`
        return res.status(201).json(`Novo agendamento feito`)
    }
    catch(error){
        return res.status(501).json('erro ao inserir produto...')
    }
})

routes.delete('/agendamento/excluir/:id', async (req, res)=>{
    try{
        const { id } = req.params

        await pool.query `delete from Agendamentos where id = ${id}`
        return res.status(201).json('deletado!')
    }
    catch(error){
        return res.status(501).json('Algo deu errado ao excluir')
    }
})

export default routes



// routes.put('/produto/:id', async (req, res) =>{
//     try{
//         const { id } = req.params
//         const { descricao, preco } = req.body

//         await pool.query `update Produtos set descricao = ${descricao}, preco = ${preco} where id = ${id}`
//         return res.status(201).json('atualizado')

//     } catch(error) {
//         console.log(er)
//         return res.status(501).json('Algo deu errado ao atualizar')
//     }
// })




// routes.get('/chamado/:id', async (req, res)=>{
//     try{
//          const { id } =  req.params;
//          const { recordset } =  await pool.query`select * from Agendamentos where idChamada=${id}`
//          return res.status(200).json(recordset)
//     }
//     catch(error){
//          return res.status(501).json('ops...algo deu errado')
//     }
//  })