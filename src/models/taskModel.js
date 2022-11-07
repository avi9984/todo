const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({

    task:{type:String, require:true},
    completed:{type:Boolean, default:false}
   
},{timestamps:true})

module.exports = mongoose.model('backend_tasks_Avinash_Kumar', taskSchema)
