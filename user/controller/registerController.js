const Register = require("../model/register");
const path = require('path');
const fs = require('fs');

const registerController = {
    userRegister: async(req, res)=>{
        console.log(req.body);
    try{
        const { name, mobile, email, password } = req.body;
        const image = req.file ? req.file.filename : null;

        const register = new Register({
            name,
            mobile,
            email,
            password,
            image,
        });
        
        const result = await register.save();
        res.status(200).send({message:"Registration has been successful.", result});
    } catch (error) {
        res.status(500).send({error: error.message}); 
    }
    },

    getAllUsers: async(req, res)=>{
        try{
            const users = await Register.find();
            res.render("users", {users});
        } catch(error){
            res.status(500).send({error: error.message});
        }  
    },

    editUser: async(req, res)=>{
        try{
            const user = await Register.findById(req.params.id);
            res.render("editUser", {user});
        } catch (error){
            res.status(500).send({error: error.message});
        }
    },

    updateUser: async (req, res) => {
        try {
            const updatedUserData = req.body;
            const user = await Register.findById(req.params.id);
    
            // Check if a new image is uploaded
            if (req.file) {
                updatedUserData.image = req.file.filename;
    
                // Check if the user has a previous image
                if (user && user.image) {
                    const previousImagePath = path.join(__dirname, '..', '..', 'uploads', user.image);

                    // Use fs.promises.access to check if the file exists
                    try {
                        await fs.promises.access(previousImagePath, fs.constants.F_OK);

                        // If the file exists, proceed with unlinking
                        await fs.promises.unlink(previousImagePath);
                        console.log(`Previous image deleted successfully: ${previousImagePath}`);
                    } catch (err) {
                        // Log more details for debugging
                        if (err.code === 'ENOENT') {
                            console.log(`File not found: ${previousImagePath}`);
                        } else {
                            console.error(`Error deleting previous image: ${err.message}`);
                        }
                    }
                } else {
                    console.log('No previous image found for the user.');
                }
            } else {
                console.log('No new image uploaded.');
            }
    
            const updatedUser = await Register.findByIdAndUpdate(req.params.id, updatedUserData, { new: true });
            res.status(200).send({ message: "User details updated successfully.", updatedUser });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
    
        
    
    deleteUser: async(req, res)=>{
        try{
            const deletedUser = await Register.findByIdAndDelete(req.params.id);
            res.status(200).send({message:"User deleted successfully.", deletedUser}) 
        } catch(error){
            res.status(500).send({error:error.message})
        }
    },

};

module.exports = registerController;