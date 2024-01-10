const express = require('express');
const router = express.Router();
const multer = require('multer');


const registerController = require("../user/controller/registerController");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'));
    }
};

const upload = multer({storage, fileFilter});

router.post('/register', upload.single("image"), registerController.userRegister);
router.get('/users', registerController.getAllUsers);
router.get('/edit/:id', registerController.editUser);
router.post('/update/:id', upload.single("image"), registerController.updateUser);
router.get('/delete/:id', registerController.deleteUser);


module.exports = router;
