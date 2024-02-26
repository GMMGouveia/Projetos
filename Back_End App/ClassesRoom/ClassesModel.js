const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassesSchema = new Schema({
    name:String,
    year: Number,
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: [true, 'escreva o id do estudante']
    }],
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'escreva o id do professor']
    }],
});

ClassesSchema.pre(/^find/, function(next){
    this.populate({
        path:'students',
        select:'-__v -password -passwordChangedAt -passwordResetExpires -passwordResetToken -active -createdAt -updatedAt'
    }).populate({
        path:'teachers',
        select:'-__v -password -passwordChangedAt -passwordResetExpires -passwordResetToken -active -createdAt -updatedAt'
    });
    next();
});

module.exports = mongoose.model('Classes', ClassesSchema);

