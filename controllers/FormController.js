const express = require("express");
const Form = require("../models/Form.js");
const router = express.Router();
const excel = require('exceljs');


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


router.get('/list/download', async (req, res, next) => {
    try {
        const data = await Form.find();
        // Create a new workbook and add a worksheet
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Data');
    
        // Define headers
        worksheet.columns = [
            { header: 'Email', key: 'email', width: 15 },
            { header: 'employment_type', key: 'employment_type', width: 10 },
            { header: 'employee_code', key: 'employee_code', width: 20 },
            { header: 'designation', key: 'designation', width: 15 },
            { header: 'nativity', key: 'nativity', width: 10 },
            { header: 'emp_name', key: 'emp_name', width: 20 },            
            { header: 'emp_contact', key: 'emp_contact', width: 15 },
            { header: 'emp_gender', key: 'emp_gender', width: 10 },
            { header: 'emp_dob', key: 'emp_dob', width: 15 },
            { header: 'spouse_name', key: 'spouse_name', width: 10 },
            { header: 'spouse_type', key: 'spouse_type', width: 20 },            
            { header: 'spouse_dob', key: 'spouse_dob', width: 15 },
            { header: 'child1_name', key: 'child1_name', width: 10 },
            { header: 'child1_gender', key: 'child1_gender', width: 20 },            
            { header: 'child1_dob', key: 'child1_dob', width: 15 },
            { header: 'child2_name', key: 'child2_name', width: 10 },
            { header: 'child2_gender', key: 'child2_gender', width: 20 },            
            { header: 'child2_dob', key: 'child2_dob', width: 15 },
            { header: 'child3_name', key: 'child3_name', width: 10 },
            { header: 'child3_gender', key: 'child3_gender', width: 20 },            
            { header: 'child3_dob', key: 'child3_dob', width: 15 },
            { header: 'mother_name', key: 'mother_name', width: 10 },
            { header: 'mother_dob', key: 'mother_dob', width: 20 },            
            { header: 'father_name', key: 'father_name', width: 15 },
            { header: 'father_dob', key: 'father_dob', width: 10 },
            { header: 'mother_in_law_name', key: 'mother_in_law_name', width: 20 },                      
            { header: 'mother_in_law_dob', key: 'mother_in_law_dob', width: 15 },            
            { header: 'other_details', key: 'other_details', width: 15 },
        ];
    
        // Add data to the worksheet
        data.forEach((item) => {
            worksheet.addRow({
            email: item.email,
            employment_type: item.employment_type,
            employee_code: item.employee_code,
            designation: item.designation,
            nativity: item.nativity,
            emp_name: item.emp_name,
            emp_contact: item.emp_contact,
            emp_gender: item.emp_gender,
            emp_dob: item.emp_dob,
            spouse_name: item.spouse_name,
            spouse_type: item.spouse_type,
            spouse_dob: item.spouse_dob,
            child1_name: item.child1_name,
            child1_gender: item.child1_gender,
            child1_dob: item.child1_dob,
            child2_gender: item.child2_gender,
            child2_name: item.child2_name,
            child2_dob: item.child2_dob,
            child3_name: item.child3_name,
            child3_gender: item.child3_gender,
            child3_dob: item.child3_dob,
            mother_name: item.mother_name,
            mother_dob: item.mother_dob,
            father_name: item.father_name,
            father_dob: item.father_dob,
            mother_in_law_name: item.mother_in_law_name,
            mother_in_law_dob: item.mother_in_law_dob,
            other_details: item.other_details,
            });
        });
    
        // Set response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    
        // Pipe the workbook to the response stream
        workbook.xlsx.write(res).then(() => {
            res.end();
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;