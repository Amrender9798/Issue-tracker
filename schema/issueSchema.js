import { Schema, model } from 'mongoose';

const issueSchema = new Schema({
  title: String,
  description: String,
  labels: [String],
  author: String,
  projectId: Schema.Types.ObjectId,
});

const Issue = model('Issue', issueSchema);

export default Issue;
