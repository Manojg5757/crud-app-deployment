import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import userModel from './model/userModel.js';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerJSDoc))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.post('/create', (req, res) => {
  userModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/user', (req, res) => {
  userModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/edit/:id', (req, res) => {
  userModel.findById(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

app.put('/edit/:id', (req, res) => {
  userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/delete/:id', (req, res) => {
  userModel.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/', (req, res) => {
  res.send('Welcome to the CRUD API');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
