const Task=require('../models/taskModel')
const redis=require('redis')
// const { promisify } = require('util');
// const redisClient = redis.createClient(
//     15873,
//     'redis-15873.c301.ap-south-1-1.ec2.cloud.redislabs.com:15873',
//     { no_ready_check: true }
//   )
  
//   //Authenticating the client (our application)
//   redisClient.auth('JuRMnWyqnDKUVuI0Pm1q4m47hQVnaa77', function(err){
//     if(err) throw err;
//   });
  
//   //if connect log a message
//   redisClient.on('connect', async function() {
//     console.log("Connected to Redis..")
//   });

//   //using promisify and bind creating functions
// const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);
// const SETEX_ASYNC = promisify(redisClient.SETEX).bind(redisClient);

const client=redis.createClient()
const addTask=async (req,res)=>{
    try {
        let data=req.body;
        let task=await Task.create(data);
        res.status(201).send({status:true, msg:"Task Created Successfully",data:task})

    } catch (error) {
        console.log(error)
        res.status(500).json({status:false, msg:error})
    }

}

const getAllTask= async (req,res)=>{
    try {
       
        const task=await Task.find({})
        return res.status(200).json({status:true, msg:"All task is here", data:task})

    } catch (error) {
        console.log(error)
        res.status(500).json({status:false, msg:error})
    }
}

const updateTask=async (req,res)=>{
    try {
        
        const id=req.params.id
        const checkId=await Task.findById(id);
        if(!checkId){
            return res.status(400).json({status:false, msg:"task not found"})
        }
        const result= await Task.findByIdAndUpdate({_id:id},{$set:req.body},{new:true});
        res.status(200).send({status:true, msg:"Task Update Successfully", data:result})

    } catch (error) {
        console.log(error)
        res.status(500).json({status:false, msg:error})
    }
}


const deleteTask=async (req,res)=>{
    try {
        const id=req.params.id
        let result=await Task.findByIdAndDelete(id)
        if(!result){
            return res.status(400).json({status:false, msg:"task is not found"})
        }
        res.status(200).json({status:true, msg:"Task Deleted Successfully", data:result})
    } catch (error) {
        console.log(error)
        res.status(500).json({status:false, msg:"server error"})
    }
}

module.exports={addTask,getAllTask,updateTask,deleteTask}