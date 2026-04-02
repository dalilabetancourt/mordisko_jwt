import express from 'express'
import{home} from '../controllers/mordiskoController.js'
const router = express.Router();

router.get('/', home)


export default router