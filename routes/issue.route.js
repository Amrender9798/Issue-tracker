import express from "express";
import Issue from "../schema/issueSchema.js";
import Project from "../schema/projectSchema.js";

const router = express.Router();
router.get('/filter/:projectId', (req, res) => {
    const {projectId} = req.params;
    res.render('filter',{projectId});
});

// Handle creating a new project
router.post('/filter/:projectId', async (req, res) => {
    try {
        const { title, description, labels, author } = req.body;
        const {projectId} = req.params;
        const project = await Project.findById(projectId);
        let issues = await Issue.find();
        if(title){
            issues = await Issue.find({title});
        }
        if(description){
            issues = await Issue.find({description});
        }
        if(labels){
            issues = await Issue.find({labels});
        }
        if(author){
            issues = await Issue.find({author});
        }
        res.render('projectDetail',{project,issues})
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;