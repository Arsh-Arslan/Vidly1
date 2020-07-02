const Joi = require('joi');
const mongoose = required('mongoose');

const customerSchema = new mongoose.Schema({
    isGold:{
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength:5,
        maxlength:50
    },
    phone:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});

const Customer = mongoose.model('Customer',customerSchema);

module.export.Customer = Customer;