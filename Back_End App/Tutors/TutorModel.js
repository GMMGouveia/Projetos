const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TutorSchema = new Schema({
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'escreva o sua id de utilizador']
    }
});

TutorSchema.pre(/^find/, function(next){
    this.populate({
        path:'user',
        select:'-_id -__v -password -passwordChangedAt -passwordResetExpires -passwordResetToken -active -createdAt -updatedAt'
    });
    next();
});	

module.exports = mongoose.model('Tutor', TutorSchema);