import { Router } from "express";
import { registerUser } from "../controllers/userControl.js";
const router = Router();

import { upload } from "../middleware/multer.middleware.js";

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;
