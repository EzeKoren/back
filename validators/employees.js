const check = require('express-validator').check
const helper = require('./helper')

const validateCreate = [
    check('email').exists().isEmail().not().isEmpty(),
    check('first_name').exists().not().isEmpty(),
    check('last_name').exists().not().isEmpty(),
    check('type').exists().not().isEmpty(),
    (req, res, next) => {
        helper.validate(req, res, next)
    }
]

module.exports = { validateCreate }
