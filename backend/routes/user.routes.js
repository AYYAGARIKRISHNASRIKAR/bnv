const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  createUser,
  getUsers,
  searchUsers,
  getUserById,
  updateUser,
  deleteUser,
  exportUsersToCSV
} = require('../controllers/user.controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('profileImage'), createUser);
router.get('/', getUsers);
router.get('/search', searchUsers);
router.get('/export/csv', exportUsersToCSV);
router.get('/:id', getUserById);
router.put('/:id', upload.single('profileImage'), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;