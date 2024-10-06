import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createRecord, deleteRecord, getRecord, getRecords, updateRecord } from "../controllers/records.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRecordSchema, updateRecordSchema } from "../schemas/record.schema.js";

const router = Router();

router.get('/records', authRequired, getRecords);
router.get('/records/:id', authRequired, getRecord);
router.post('/records', authRequired, validateSchema(createRecordSchema), createRecord);
router.delete('/records/:id', authRequired, deleteRecord);
router.put('/records/:id', authRequired, validateSchema(updateRecordSchema), updateRecord);

export default router;
