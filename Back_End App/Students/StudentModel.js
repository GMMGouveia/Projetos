const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    firstName: String,
    lastName: String,
    birthDate: Date,
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor',
        required: [true, 'escreva o id do tutor']
    },
    
});

module.exports = mongoose.model('Student', StudentSchema);

StudentSchema.pre(/^find/, function(next){
    this.populate({
        path:'tutor',
        select:'-_id -__v -password -passwordChangedAt -passwordResetExpires -passwordResetToken -active -createdAt -updatedAt'
    }).populate({
        path:'classes',
        select:'-_id -__v -password -passwordChangedAt -passwordResetExpires -passwordResetToken -active -createdAt -updatedAt'
    });
    next();
});