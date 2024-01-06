import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';

import connectDB from './dbconfig.js';

import newProjectRouter from './routes/newProject.route.js';
import homeRouter from './routes/home.route.js';
import projectDetailRouter from './routes/projectDetail.route.js';
import expressEjsLayouts from 'express-ejs-layouts';
import issueRouter from './routes/issue.route.js';


const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join('views'));  // Specify the correct directory
app.use(expressEjsLayouts);  // Specify that you're using express-ejs-layouts

app.use('/', homeRouter);
app.use('/projects', newProjectRouter);
app.use('/project-details', projectDetailRouter);
app.use('/issue',issueRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
