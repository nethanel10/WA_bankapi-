import { Router } from "express";
import{
    Addnewuser,
    Readuser,
    loadUsers,
    updateCredit,
    deposit,
    transfer,
} from "../controllers/controllers.js"

const router = Router();

router.get("/users",(req,res)=>{
    res.status(200).send(loadUsers())
});

router.post("/users",(req,res)=>{
    console.log(req.body);

    try{
const createuser=Addnewuser(req.body);
res.status(201).send(createuser)
    }

    catch(err){
        res.status(400).json({error:err.message})
    }

})

router.get("/users/:id",(req,res)=>{

    try{
res.status(200).send(Readuser(req.params.id))
    }

    catch(err){
        res.status(400).json({error:err.message})

    }
})

router.put("/users/:id/credit",(req,res)=>{
    const {id}=req.params;
    const {newCredit} = req.body
    if(!newCredit) return res.status(400).send("empty newCredit field.")
    try{
        res.status(200).send(updateCredit(id,newCredit))
    }

    catch(err){
        res.status(400).json({error:err.message})
    }
})

router.put("/users/:id/deposit",(req,res)=>{
    const {id}=req.params;
    const {amount} = req.body
    if(!amount) return res.status(400).send("empty amount field.")
    try{
        res.status(200).send(deposit(id,amount))
    }

    catch(err){
        res.status(400).json({error:err.message})
    }
})

router.put("/users/transfer/:from/:to",(req,res)=>{
    const {from, to}=req.params;
    const {amount} = req.body
    if(!amount || !from || !to) return res.status(400).send("empty field. try again.")
    try{
        res.status(200).send(transfer(from, to, amount))
    }

    catch(err){
        res.status(400).json({error:err.message})
    }
})

export default router;