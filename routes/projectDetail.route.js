import { Router } from 'express';
import Project from '../schema/projectSchema.js'; // Import the Project model
import Issue from '../schema/issueSchema.js'; // Import the Issue model
const router = Router();

// GET route for Project Detail Page
router.get('/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;
        // Fetch project details from the database based on projectId
        const project = await Project.findById({ _id: projectId });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Fetch related issues from the database based on projectId
        const issues = await Issue.find({projectId });
        res.render('projectDetail', { project, issues });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route for creating a new issue
router.get('/:projectId/issues', async (req, res) => {
    try {
        const projectId = req.params.projectId;

        // Fetch project labels from the database based on projectId
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.render('createIssue', { projectId});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route for creating a new issue
router.post('/:projectId/issues', async (req, res) => {
    try {
        const { title, description, labels, author } = req.body;
        const projectId = req.params.projectId;

        // // Validate if the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Create a new issue document
        const newIssue = new Issue({
            title,
            description,
            labels,
            author,
            projectId,
        });

        // Save the new issue to the database
        await newIssue.save();

        res.redirect(`/project-details/${projectId}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
