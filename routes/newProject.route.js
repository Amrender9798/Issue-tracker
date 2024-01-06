import express from "express";
import Project from "../schema/projectSchema.js";
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('newProject');
});

// Handle creating a new project
router.post('/new', async (req, res) => {
    try {
        const { name, description, author } = req.body;
        const project = new Project({ name, description, author });
        await project.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

export default router;