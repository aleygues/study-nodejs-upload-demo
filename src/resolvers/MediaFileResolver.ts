/** resolvers/MediaFileResolver.ts */
import { MediaFile, MediaFileInput } from "../entities/MediaFile";
import { Arg, Mutation, Resolver } from "type-graphql";
import { createWriteStream } from "fs";
import * as tmp from "tmp";

export const mediaFiles: MediaFile[] = [];

@Resolver(MediaFile)
export class MediaFileResolver {
    @Mutation(() => MediaFile)
    public async createMediaFile(@Arg('data', () => MediaFileInput) data: MediaFileInput): Promise<MediaFile> {
        const file = await data.file;
        console.log(file);
        const tmpDir = tmp.dirSync();
        const path = `${tmpDir.name}/${file.file.filename}`;

        const handleWirte = new Promise((resolve, reject) => {
            file.file.createReadStream()
                .pipe(createWriteStream(path))
                .on('error', reject)
                .on('finish', resolve);
        });

        try {
            await handleWirte;
        } catch (e) {
            console.error(e);
        }

        let result;
        mediaFiles.push(result = {
            filename: file.file.filename,
            publicUrl: `http://localhost:3002/images/${mediaFiles.length}`,
            path
        });

        return result;
    }
}