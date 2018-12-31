const User = require('../models/users');

module.exports = {
    register: (req, res) => {
        res.render('user/register', {title: 'Register page - Trang đăng kí', success: req.session.success, errors: req.session.errors});
        req.session.errors = null;
    },
    login: (req, res) => res.render('user/login', {title: 'Login page - Trang đăng nhập'}),

    registerUser: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        
        let data = {
            username: username,
            password: password,
            email: email
        };

        User.findOne({username: username}, (err, doc) => {
            if (err) {
                res.status(500).send('Error occured');
            } else {
                if (doc) {
                    req.session.errors = 'Username is exist!';
                } else {
                    let log = new User();
                    log.username = username;
                    log.email = email;
                    log.password = log.hashPassword(password);

                    log.save((err, data) => {
                        
                    });
                }
            }
        });
        
    }
}