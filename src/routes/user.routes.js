import { Router } from "express";
import {upload } from "../middlewares/multer.middleware.js"
// import { registerUser } from "../controllers/userControl.js";
import {registerUser} from "../controllers/userControl.js"

// import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/register").get(
 
  registerUser
);

export default router;
