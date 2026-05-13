// import { Router } from "express";
// import { createPress } from  '../../controllers/admin.press.controller';


// const router = Router();

// router.post("/", createPress); 

// export default router;

import { Router } from "express";
import { 
  createPress, 
  getAllPress, 
  getPressById, 
  updatePress, 
  deletePress 
} from '../../controllers/admin.press.controller';

const router = Router();

router.post("/", createPress);
router.get("/", getAllPress); // Add this line
router.get("/:id", getPressById); // Add this line
router.put("/:id", updatePress); // Add this line
router.delete("/:id", deletePress); // Add this line

export default router;