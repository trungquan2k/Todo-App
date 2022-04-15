
const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete');

const todoList=new mongoose.Schema({
    User_ID:{
        type:String,
        required:true
    },
    User_Name:{
        type:String,
    },
    Avatar:{
        type:String,
    },
    Content:{
        type:String,
        required:true,
    },
    Status:{
        type:Boolean,
        default:true,
    },
    Time:{
        type:Date,
        default:Date.now
    }
});
todoList.plugin(mongoose_delete, { deletedAt : true, overrideMethods: 'all' });
const Todo = mongoose.model('Todos', todoList);

module.exports=Todo;