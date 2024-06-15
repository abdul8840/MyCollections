import express from 'express';
import { create, getPost,getPostById, editPost, deletePost } from '../controllers/country.controller.js';

const router = express.Router();

router.post('/create', create);
router.get('/get', getPost);
router.get('/get/:id', getPostById); // Route to get a specific post by ID
router.put('/edit/:id', editPost);
router.delete('/delete/:id', deletePost);

export default router;