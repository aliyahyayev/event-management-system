const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

// GET Marşrutları
router.get('/', userController.getAllUsers); // Bayaq 404 verən yer bura idi, artıq işləyəcək!
router.get('/event/:eventId', userController.getUsersByEvent); // JOIN sorğusu üçün

// POST və DELETE Marşrutları
router.post('/', userController.createUser); 
router.post('/register', userController.registerToEvent); 
router.delete('/cancel', userController.cancelRegistration); 

module.exports = router;