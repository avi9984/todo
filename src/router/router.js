const express=require('express')
const router=express.Router();

const Task=require('../controller/taskController')

router.post('/addTask',Task.addTask)

module.exports=router

router.get('/allTask',Task.getAllTask)
router.put('/updateTask/:id',Task.updateTask)
router.delete('/delete/:id',Task.deleteTask)
