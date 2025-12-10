import express from 'express'; 

import { uploadFile, auditText, auditFile } from '../controller/auditController.js';

const router = express();

router.post('/file', upload.single('file'), UploadFile );
router.post("/text", auditText);
router.post("/file", auditFile);

export default router;