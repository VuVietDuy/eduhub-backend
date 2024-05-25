const User = require('./user.model')

async function createUser(user) {
    const newUser = new User(user)
    await newUser.save()
        .then((user) => {
            return { result: user, error: null }
        })
        .catch(err => {
            return { result: null, error: err }
        })
}

module.exports = {
    createUser,
}