import * as express from 'express';
import { mediaFiles } from './resolvers/MediaFileResolver';

const router = express.Router();

router.get('/images/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    const image = mediaFiles[imageId];
     
    res.sendFile(image.path);
});

export const Router = router;