const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the notes of the user using: GET "/api/notes/fetchallnotes" . Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a note using: POST "/api/notes/addnote" . Login required
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 })
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        // If errors exists, then this code is executed
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update a note using: PUT "/api/notes/updatenote" . Login required
router.put("/updatenote/:id", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 })
], async (req, res) => {

    const {title, description, tag} = req.body

    try {
        //Creating newNote object
        const newNote = {}
        if(title){
            newNote.title = title
        }
        if(description){
            newNote.description = description
        }
        if(tag){
            newNote.tag = tag
        }

        // Finding the note to update
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not Found")
        }
        // Allow to update only if the note is of that particular user
        if (note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

        res.json({note})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
    
})

// ROUTE 4: Delete a note using: DELETE "/api/notes/deletenote" . Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) =>{

    try {
        // Finding the note to delete
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not Found")
        }
        // Allow to delete only if the note is of that particular user
        if (note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({"Success": "This note has been deleted", note: note})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


module.exports = router;
