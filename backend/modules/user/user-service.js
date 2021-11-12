const fs = require('fs')
const gUsers = require('../../db/user.json')


function _addUserToDB() {
    fs.writeFileSync('data/car.json', JSON.stringify(gUsers, null, 2))
}

function _getUser(username){
    const user = gUsers.find(u => u.id === username)
    return user;
}