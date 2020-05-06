const express = require('express');
const user_router = express.Router();

var users = [
	{id: 1, name: "User1", email: "user1@gmail.com", age: 31}, 
	{id: 2, name: "User2", email: "user2@gmail.com", age: 20},
	{id: 3, name: "User1", email: "user1.2@gmail.com", age: 25}
];

// user_router.get('/', (req, res) => {
//     res.send("<h2>This is my first app</h2>");
// })

user_router.get('/user', function(req, res){
	res.send('<div class="users"><table><thead><tr><th> Name </th><th> Email </th></tr>	</thead><tbody><tr><td> User1 </td><td> user1@gmail.com </td></tr><tr><td> User2 </td><td> user2@gmail.com </td></tr></tbody></table>	</div>')
})

user_router.get('/', function(req, res){
    res.render('users/index',{users: users});
})

user_router.get('/create', (req, res) => {
	res.render('users/create')
})

user_router.post('/create', (req, res) => {
    console.log(req.body)
    users.push(req.body);
   res.redirect('/users')
})
user_router.get('/search', (req,res) => {
    var name_search = req.query.name
    var age_search = req.query.age
    var result = users.filter( (user) => {
        return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age == parseInt(age_search)
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

module.exports = user_router;
