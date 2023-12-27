const express = require("express");
const Form = require("../models/Form.js");
const router = express.Router();


router.post("/create", async (req, res, next) => {
    try{
        const { email,employment_type,employee_code,designation,nativity,emp_name,emp_contact,emp_gender,emp_dob,spouse_name,spouse_type,spouse_dob,child1_name,child1_gender,child1_dob,child2_name,child2_gender,child2_dob,child3_name,child3_gender,child3_dob,mother_name,mother_dob,father_name,father_dob,mother_in_law_name,mother_in_law_dob,other_details } = req.body;
        const form_data = await Form.create({
            email,employment_type,employee_code,designation,nativity,emp_name,emp_contact,emp_gender,emp_dob,spouse_name,spouse_type,spouse_dob,child1_name,child1_gender,child1_dob,child2_name,child2_gender,child2_dob,child3_name,child3_gender,child3_dob,mother_name,mother_dob,father_name,father_dob,mother_in_law_name,mother_in_law_dob,other_details
        });
        res.status(200).json(form_data);
    }catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/list", async (req, res, next) => {
    try {
      const froms = await Form.find({});
  
      res.status(200).json({ froms });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: error.message });
    }
});



router.get("/:id", async (req, res, next) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'record not found.' });
        }
        res.status(200).json(form);
    } catch (error) {
        console.error('Error retrieving record:', error);
        res.status(500).json({ error: 'Failed to retrieve record.',error:error.message });
    }
});


module.exports = router;