import { Router } from "express";
import { upload } from "../middlewares/MulterConfig";
import { UploadFile } from "../controllers/UploadController";

const router = Router();
const uploadFile = new UploadFile();

router.post('/upload', upload.single('file'), uploadFile.execute);

export { router };
