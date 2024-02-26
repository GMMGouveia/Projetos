const mongoose = require('mongoose');
var currentUser = require('./UserModel');



//criar um novo usuario
exports.createUser = async function (req, res, next) {
    try {
        let c1 = req.body;
        let newItem = await currentUser.create(c1);
        res.status(201).json({
            status: 'sucesso',
            data: newItem
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'erro',
            message: "error to create a user" + err
        })
    }

};

//buscar todos os usuarios

exports.getAllUsers = async function (req, res, next) {
    //filtro
    let queryObj = { ...req.query };
    let excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el =>{ delete queryObj[el]});

    // filtro avançado
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    queryObj = JSON.parse(queryStr);
    console.log(queryObj);
    let sort = "";
    let select = "";

    if (req.query.sort) {
        sort = req.query.sort.split(',').join(' ');//separar por virgula e juntar com espaço
    }

    if(req.query.sort){
        select = req.query.fields.split(',').join(' '); //mosntrar apenas os campos que eu quero
    }

    let limit = req.query.limit * 1 || 100; //converter para numero
    let page =req.query.page||1;
    let skip = (page-1)*limit;
    let documents = await currentUser.countDocuments();
    if(skip >= documents){
        res.status(404).json({
            status: 'erro',
            message: 'page not found'
        })
        return;
    }

    currentUser.find(queryObj).skip(skip).limit(limit).select(select).sort(sort).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    }).catch((err) => {
        res.status(404).json({
            status: 'erro',
            nessage: 'user not found'
        })
    })
}




//buscar usuario por id

exports.getUserById = function (req, res, next) {
    let id = req.params.id;
    currentUser.find({ _id: id }).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    }).catch((err) => {
        res.status(404).json({
            status: 'erro',
            message: 'user not found'
        })
    })
}


//atualizar usuario por id

exports.updateUser = function (req, res, next) {
    let id = req.params.id;
    currentUser.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data
            })
        })
        .catch((err) => {
            res.status(404).json({
                status: 'erro',
                message: 'user not found'
            })
        })
}

//apagar usuario por id
exports.deleteUser = function (req, res, next) {
    let id = req.params.id;
    currentUser.findByIdAndDelete(id).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data
        })
    }).catch((err) => {
        res.status(404).json({
            status: 'erro',
            message: 'user not found'
        })
    })
}

