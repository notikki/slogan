module.exports.reg_valid = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    req.checkBody({
        'username': {
            notEmpty: true,
            isLength: {
                option: [{min: 5, max: 12}],
                errorMessage: 'Username must be between 5 to 12 characters'
            }
        },
        'email': {
            notEmpty: true,
            isEmail: {
                errorMessage: 'Invalid Email Address'
            },
            errorMessage: 'Email is required'
        },
        'password': {
            notEmpty: true,
            isLength: {
                option: [{min: 8}],
                errorMessage : "Password must be greater than 7 characters"
            },
            errorMessage: 'Password is required'
        }
    });

        let errors = req.validationErrors();
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/register');
        } else {
            req.session.success = true;
            res.redirect('/');
        }
}