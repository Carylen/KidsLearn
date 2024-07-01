const asgRepos = require('./asgRepository')

const findAsg = async() => {
    return await asgRepos.getAll()
}

const findAsgById = async(id) => {
    return await asgRepos.getById(id)
}

module.exports = {
    findAsg,
    findAsgById
}