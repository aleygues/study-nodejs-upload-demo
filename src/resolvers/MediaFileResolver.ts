/** resolvers/MediaFileResolver.ts */
import { MediaFile, MediaFileInput } from "../entities/MediaFile";
import { Arg, Mutation, Resolver } from "type-graphql";
import { createWriteStream } from "fs";
import * as tmp from "tmp";
import sharp from "sharp";
import { getModelForClass } from "@typegoose/typegoose";

@Resolver(MediaFile)
export class MediaFileResolver {
    @Mutation(() => MediaFile)
    public async createMediaFile(@Arg('data', () => MediaFileInput) data: MediaFileInput): Promise<MediaFile> {
        const file = await data.file;
        const tempDir = tmp.dirSync().name;
        const path = `${tempDir}/${file.file.filename}`;

        const handleWirte = new Promise((resolve, reject) => {
            file.file.createReadStream()
                .pipe(createWriteStream(path))
                .on('error', reject)
                .on('finish', resolve);
        });

        try {
            await handleWirte;

            await sharp(path)
                .jpeg({ quality: 100, progressive: true })
                .resize({ width: 200, height: 200, fit: 'cover' })
                .toFile(`${process.cwd()}/storage/thumb-${file.file.filename}`);

            await sharp(path)
                .jpeg({ quality: 100, progressive: true })
                .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
                .toFile(`${process.cwd()}/storage/${file.file.filename}`);



            const model = getModelForClass(MediaFile);
            const entry = await model.create({
                filename: file.file.filename,
                publicUrl: '',
                path: `${process.cwd()}/storage/${file.file.filename}`
            });
            entry.publicUrl = `http://localhost:3002/images/${entry._id}`;
            return entry.save();
        } catch (e) {
            console.error(e);
            throw new Error('Upload failed');
        }
    }
}