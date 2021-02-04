import { getModelForClass } from '@typegoose/typegoose';
import { MediaFile } from './entities/MediaFile';
import * as express from 'express';

const router = express.Router();

router.get('/images/:mediaId', async (req, res) => {
    const mediaId = req.params.mediaId;
    const model = getModelForClass(MediaFile);
    const mediaFile = await model.findById(mediaId);

    if (mediaFile) {
        res.sendFile(mediaFile.path);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

export const Router = router;