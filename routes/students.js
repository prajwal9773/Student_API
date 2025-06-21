const express = require('express');
const router = express.Router();
const pool = require('../db');
const Joi = require('joi');

// Define Joi validation schema
const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  course: Joi.string().required(),
  year: Joi.number().integer().required()
});

// POST /students - Add new student with Joi validation
router.post('/', async (req, res) => {
  const { error, value } = studentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email, course, year } = value;

  try {
    const result = await pool.query(
      'INSERT INTO students (name, email, course, year) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, course, year]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

router.get('/', async(req,res)=>{
  

    try{
        const result = await pool.query('SELECT * FROM students');
        if(result.rows.length === 0){
            return res.status(404).json({error : 'student not found'});
        }
        res.json(result.rows);

    }catch(err){
        console.log('Error Fetching student by id',  err);
        res.status(500).json({error: 'server error'});

    }

});




router.get('/:id', async(req,res)=>{
    const {id} = req.params;

    if(!/^\d+$/.test(id)){
        return res.status(400).json({error :"Invalid student id"});
    }
    try{
        const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
        if(result.rows.length === 0){
            return res.status(404).json({error : 'student not found'});
        }
        res.json(result.rows[0]);

    }catch(err){
        console.log('Error Fetching student by id',  err);
        res.status(500).json({error: 'server error'});

    }

});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
  
    // Validate id format
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }
  
    // Validate input data
    const { error, value } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    const { name, email, course, year } = value;
  
    try {
      const result = await pool.query(
        'UPDATE students SET name = $1, email = $2, course = $3, year = $4 WHERE id = $5 RETURNING *',
        [name, email, course, year, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json({ message: 'Student updated successfully', student: result.rows[0] });
    } catch (err) {
      console.error('Error updating student:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });


  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }
  
    try {
      const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json({ message: 'Student deleted successfully', student: result.rows[0] });
    } catch (err) {
      console.error('Error deleting student:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  



module.exports = router