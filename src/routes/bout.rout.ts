import { Router } from 'express';
import {
  getBouts,
  createBout,
  getBoutById,
  updateBout,
  deleteBout,
  recordStoppage,
  getBoutResult,
} from '../controllers/bout.controller.js';

const router = Router();

router.route('/')
  .get(getBouts)
  .post(createBout);

router.route('/:id')
  .get(getBoutById)
  .put(updateBout)
  .delete(deleteBout);

// New routes
router.put('/:id/stoppage', recordStoppage);
router.get('/:id/result', getBoutResult);

export default router;