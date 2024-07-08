const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Get All Notes: Get "/api/notes/fetchallnotes".
router.get('/fetchallnotes',fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes)       
    } catch (error) {
        console.error(error.message); 
        res.status(500).send("some error occur") 
    }

}),

//Add Notes: Post "/api/notes/addnotes".
router.post('/addnotes',fetchuser,[
    body('title','Enter a Valid Title').notEmpty(),
    body('title','title Length should be greater than 3 letter').isLength({ min: 3 }),
    body('description','password Length should be greater than 6 letter').isLength({ min: 6 })
  ], async (req, res) => {    
    // Check whether the user with email exits already
    try { 
        const{title,description,tag} = req.body;

        // if there are an error then return bad request and errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }   
        const notes = new Notes({
            title,description, tag, user:req.user.id
        })
        const savedNote = await notes.save();        
        res.json(savedNote);
    } catch (error) {
      console.error(error.message); 
      res.status(500).send("some error occur")     
    } 
}),

//update a exiting Note: Put "/api/notes/updatenote".
router.put('/updatenote/:id',fetchuser, async (req, res) => {    
    // Check whether the user with email exits already
    try { 
        const{title,description,tag} = req.body;
        //create a new Note object
        const newNote = {}
        if(title){newNote.title = title;}
        if(description){newNote.description = description;}
        if(tag){newNote.tag = tag;}
        //console.log(req.params.id);
        //console.log(req.user.id);
        // Find the note to be updated and updatted
        let checkNoteOwner = await Notes.findOne({_id: req.params.id, user: req.user.id });
        //console.log(checkNoteOwner);
        if (!checkNoteOwner) {
            return res.status(401).send("Not Allowed.");
        }
        //  let note = await Notes.findById(req.params.id);
        //  console.log(req.id);
        
        // if(!note){return res.status(404).send("Not Found")}
        // if(note.user.toString() !== req.user.id){
        //     return res.status(401).send("Not Allowed")
        // }
        const note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
        res.json(note);
  
    } catch (error) {
      console.error(error.message); 
      res.status(500).send("some error occur")     
    } 
}),

//delete a exiting Note: Delete "/api/notes/deletenote".
router.delete('/deletenote/:id',fetchuser, async (req, res) => {    
    // Check whether the user with email exits already
    try { 
        // Find the note to be deleted
        let checkNoteOwner = await Notes.findOne({_id: req.params.id, user: req.user.id });
        //console.log(checkNoteOwner);
        if (!checkNoteOwner) {
            return res.status(401).send("Not Allowed.");
        }
        const note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted", note:note});  
    } catch (error) {
      console.error(error.message); 
      res.status(500).send("some error occur")     
    } 
}),
module.exports = router