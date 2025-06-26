import { Router } from "express";
import {
    createCharacter,
    getallcharacters,
    getcharacterbyid,
    updatecharacter,
    deletecharacter
} from '../controllers/character.controllers.js';

const router = Router();

router.get('/', getallcharacters);
router.get('/:id', getcharacterbyid);
router.post('/', createCharacter);
router.put('/:id', updatecharacter);
router.delete('/:id', deletecharacter);

export default router;
