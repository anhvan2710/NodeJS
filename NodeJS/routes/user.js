const express = require('express');
var multer  = require('multer')
const user_router = express.Router();
const db = require('../db');
const controller = require('../controller/user.controller');
const requireAuthController = require('../middlewares/auth.middleware')
var upload = multer({ dest: './public/uploads/' })

// var users = [
// 	{id: 1, name: "User1", email: "user1@gmail.com", age: 31}, 
// 	{id: 2, name: "User2", email: "user2@gmail.com", age: 20},
// 	{id: 3, name: "User3", email: "user1.2@gmail.com", age: 25}
// ];

// user_router.get('/', (req, res) => {
//     res.send("<h2>This is my first app</h2>");
// })

user_router.get('/', requireAuthController.requireAuth, controller.index)

// user_router.get('/', function(req, res){
//     res.render('users/index',{users: users});
// })

user_router.get('/create', (req, res) => {
	res.render('users/create')
})

// POST create user
// user_router.post('/create', function (req, res) {
//     // Add a post
//     db.get('users').push(req.body).write()
//     res.redirect('/users');
// })


user_router.get('/search', (req,res) => {
    var name_search = req.query.name
    var age_search = req.query.age
    var result = db.get('users').value.filter( (user) => {
		// tìm kiếm chuỗi name_search trong user name. 
		// Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
		return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age === parseInt(age_search)
	})
    res.render('/index', {
        users: result
    });
})

user_router.get('/:id', (req, res) => {
    console.log(req.params);
    // Tìm user phù hợp với params id
	var user = users.find( (user) => {
		return user.id == parseInt(req.params.id);
	});
    // Render trang show, với một biến user được định nghĩa là user vừa tìm được
	res.render('users/show', {
    	user: user
    })
})

user_router.post('/create', upload.single('avatar'), function (req, res, next) {
    console.log(req.file, req.body)
    req.body.avater = req.file.path.split('/').slice(1).join('/');

    db.get('users').push(req.body).write()
    res.redirect('/users');
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

module.exports = user_router;
