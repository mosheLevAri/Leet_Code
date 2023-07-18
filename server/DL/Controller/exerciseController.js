const mongoose = require('mongoose')

const exeModel =  require('../Model/exerciseModel')

async function create(data) {
    return await exeModel.create(data)
}

async function read(filter={},projection) {
    return await exeModel.find(filter,projection)
}

async function update(_id,data) {
    return  await exeModel.findByIdAndUpdate(_id,data, { new: true, runValidators: true });
}

async function remove(_id) {
    return exeModel.findByIdAndUpdate(_id, { status: "deleted" })
}


module.exports ={
    create,
    read,
    update,
    remove
}