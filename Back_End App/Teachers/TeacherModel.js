const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TeacherSchema = new Schema({
    firstName:{
        type: String,
        required: [true, 'escreva o seu nome']
    },
    lastName:{
        type: String,
        required: [true, 'escreva o seu apelido']
    },
    birthDate:{
        type: Date,
        required: [true, 'escreva a sua data de nascimento']
    },
    address:{
        type: String,
        required: [true, 'escreva a sua morada']
    },
    subject:{
        type: String,
        required: [true, 'escreva a sua disciplina']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'escreva o seu email']
    }
});

TeacherSchema.pre(/^find/, function(next){
    this.populate({
        path:'user',
        select:'-_id -__v -password -passwordChangedAt -passwordResetExpires -passwordResetToken -active -createdAt -updatedAt'
    });
    next();
});

module.exports = mongoose.model('Teacher', TeacherSchema);