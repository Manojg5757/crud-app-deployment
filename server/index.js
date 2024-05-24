import mongoose from "mongoose";
import express from "express";
import cors from "cors"
import userModel from "./model/userModel.js";
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(res=>console.log("Connected to mongodb"))
.catch(err=>console.log(err))

app.post('/create',(req,res)=>{
      userModel.create(req.body)
      .then(users=>res.json(users))
      .catch(err=>res.json(err))
})

app.get('/user',(req,res)=>{
    userModel.find({})
    .then(users=>{
        res.json(users)
    })
    .catch(err=>console.log(err))
})

app.get('/edit/:id',(req,res)=>{
    
    userModel.findById(req.params.id)
    .then(users=>{
        res.json(users)
    }).catch(err=>console.log(err))
})

app.put("/edit/:id",(req,res)=>{
    userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(users=>{
        res.json(users)
    }).catch(err=>console.log(err))
})

app.delete("/delete/:id",(req,res)=>{
    userModel.findByIdAndDelete(req.params.id)
    .then(users=>{
        res.json(users)
    }).catch(err=>console.log(err))
})


app.listen(3000,()=>{
    console.log("Connected")
})