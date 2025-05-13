import express from 'express';
import { getAllProfiles, getMyProfile, updateMyProfile, deleteMyProfile } from '../controllers/profileController.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();

// Routes protégées par JWT
router.get('/', verifyToken, getMyProfile);             // GET mon profil
console.log("profileRoutes.js chargé");
router.put('/', verifyToken, updateMyProfile);          // PUT mise à jour de mon profil
router.delete('/', verifyToken, deleteMyProfile);       // DELETE mon profil

// (optionnel) route admin pour voir tous les profils
router.get('/all', verifyToken, isAdmin, getAllProfiles);        // GET tous les profils

export default router;