const mongoose = require("mongoose");
const { Schema } = mongoose;

const FormSchema = new Schema({
    email: {
        type: String,
        required: true,
    }, 
    employment_type:{
        type: String,
        required:true,
    },
    employee_code:{
        type: String,
        required:true,
    },
    designation:{
        type: String,
        required:true,
    },
    nativity:{
        type: String,
        required:true,
    },
    emp_name:{
        type:String,
    },
    emp_contact:{
        type:String,
        default:false
    },
    emp_gender:{
        type:String,
        required:true
    },
    emp_dob:{
        type:Date,
        required:true
    },
    spouse_name:{
        type:String,
        required:true
    },
    spouse_type:{
        type:String,
        required:true
    },
    spouse_dob:{
        type:Date,
    },
    child1_name:{
        type:String,
        required:true
    },
    child1_gender:{
        type:String,
    },
    child1_dob:{
        type:Date,
    },
    child2_name:{
        type:String,
        required:true
    },
    child2_gender:{
        type:String,
    },
    child2_dob:{
        type:Date,
    },
    child3_name:{
        type:String,
        required:true
    },
    child3_gender:{
        type:String,
    },
    child3_dob:{
        type:Date,
    },
    mother_name:{
        type:String,
    },
    mother_dob:{
        type:Date,
    },
    father_name:{
        type:String,
    },
    father_dob:{
        type:Date,
    },
    mother_in_law_name:{
        type:String,
    },
    mother_in_law_dob:{
        type:Date,
    },
    other_details:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Form =  mongoose.model("Form", FormSchema);

module.exports = Form;