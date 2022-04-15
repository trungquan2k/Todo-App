const Todo = require('../../models/todo.model');
const Admin = require('../../models/admin.model');
const HTTPStatus = require('http-status');

exports.addTodo=async(req, res)=>{
    const admin= req.admin;
    try {   
        if(!admin){
            return res
            .status(HTTPStatus.BAD_REQUEST)
            .send("Missing user, user doesn't exist");
        };
        const newTodo= new Todo(req.body);
        newTodo.User_ID=admin._id;
        newTodo.Avatar=admin.avatar;
        newTodo.User_Name=admin.username;
        await newTodo.save();
        const listPost = await Todo.find().sort('-date');
        if(listPost) return res.status(HTTPStatus.OK).json({ message: "Getting success!", "data": listPost });
    } catch (err) {
        return res.status(500).json({ message: "Something is wrong!", err: err.messages });
    }
}
exports.getById= async (req, res, next) => {
    const { idTodo } = req.params;
    try {
        if (!idTodo) return res.status(HTTPStatus.BAD_REQUEST).send("Missing ID OF TODOLIST");
        const todo = await Todo.findById(idTodo);
        if (todo) return res.status(HTTPStatus.OK).send(todo);
        return res.status(HTTPStatus.NOT_FOUND).send("");
    } catch (error) {
         return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send("Error");
    }
};

exports.getAll=async(req, res, next)=>{
    let { sort } = req.query;
    try {      
          if (["des", "descending"].includes(sort)) sort = "descending";
          if (["asc", "ascending"].includes(sort)) sort = "ascending";
          if (!["asc", "ascending","des", "descending"].includes(sort)) sort = "descending";
          const todos = await Todo.find({}).limit(100).sort({ createdAt: sort });
          if (todos) return res.status(HTTPStatus.OK).json(todos);
          return res.status(HTTPStatus.NOT_FOUND).send("");
    }   catch (error) {
          return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send("Error");
    }
    
};