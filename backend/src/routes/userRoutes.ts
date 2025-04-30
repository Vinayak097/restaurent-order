import e from "express";
import { saveUser } from "../controller/userController";

const router=e.Router()

router.post('/', saveUser)
export default router;