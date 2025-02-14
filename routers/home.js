const express = require('express');
const Router = express.Router();
const Club = require('../models/club');

// Render home page
Router.get('/', (req, res) => { // Corrected callback params
    res.render('index');
});

// Create/Insert Data
Router.post('/add', async (req, res) => {
    const { name, email } = req.body;

    try {
        const club = new Club({ name, email });
        const savedClub = await club.save(); // Await correct
        console.log("Data Saved:", savedClub);
        res.redirect('/');
    } catch (err) {
        console.error("Error while saving the club:", err);
        res.status(500).send("Failed to save the club");
    }
});

// Find Data
Router.get('/show', async (req, res) => {
    try {
        const students = await Club.find();
        res.render('show', { students });
    } catch (err) {
        console.error("Error while fetching data:", err);
        res.status(500).send("Failed to fetch data");
    }
});

// Update Data - Show Edit Page
Router.get('/edit/:id', async (req, res) => {
    try {
        const studentdata = await Club.findById(req.params.id);
        res.render('edit', { studentdata });
    } catch (err) {
        console.error("Error while fetching for edit:", err);
        res.status(500).send("Failed to load edit page");
    }
});

// Update Data - Submit Edit
Router.post('/edit/:id', async (req, res) => {
    try {
        await Club.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/show');
    } catch (err) {
        console.error("Error while updating:", err);
        res.status(500).send("Failed to update data");
    }
});

// Delete Data
Router.get('/delete/:id', async (req, res) => {
    try {
        await Club.findByIdAndDelete(req.params.id);
        console.log("Deleted Successfully");
        res.redirect('/show');
    } catch (err) {
        console.error("Error while deleting:", err);
        res.status(500).send("Failed to delete data");
    }
});

module.exports = Router;
