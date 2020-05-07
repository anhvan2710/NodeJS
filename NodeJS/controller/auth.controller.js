const db = require('../db');
var md5 = require('md5');

module.exports.login = function(req, res){
    console.log('---------auth/login-------------')

	res.render('auth/login');
};

module.exports.postlogin = function(req, res){
    console.log('---------pass-------------')
    var email = req.body.email;
    var pass = req.body.password
    console.log('---------email-------------',email)

    const user = db.get('users').find({email: email}).value();
    if (!user) {
        res.render('auth/login',{
            errors: [
                'User does not exist.'
            ],
            values: res.body
        });
        return;
    }

    var hashedPassword = md5(pass)
    if(user.password !== hashedPassword) {
        res.render('auth/login',{
            errors: [
                'Wrong password'
            ],
            values: res.body
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    } )
    console.log('---------userId-------------',user.id)
    res.redirect('/users')

};

