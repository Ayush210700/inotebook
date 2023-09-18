const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../Middleware/fetchuser');
const Note = require('../models/Note');

//ROUTE 1: Fetch all notes using: GET "/api/notes/fetchnotes". Login Required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.")
    }
})

//ROUTE 2: Add new notes using: POST "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a Valid Title.').isLength({ min: 3 }),
    body('description', 'Description is too small.').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if there are errors, return bad Request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.")
    }
})

//ROUTE 3: Update an Existing notes using: PUT "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a newNote Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow Updation only if user owns this Note.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.")
    }
})

//ROUTE 4: Delete an Existing notes using: Delete "/api/notes/deletenote". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it.
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow Deletion only if user owns this Note. 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.")
    }
})

module.exports = router
