// routes/index.js

import { Router } from 'express';
const router = Router();
import Project from '../schema/projectSchema.js'; // Import your Project model

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.render('home', { projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
