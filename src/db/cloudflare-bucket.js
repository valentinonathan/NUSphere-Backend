import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadImagePost(fileBuffer, contentType, filename) {
    const key = `post-images/${Date.now()}-${filename}`;
    
    await r2.send(
        new PutObjectCommand({
            Bucket: "nusphere-posts",
            Key: key,
            Body: fileBuffer,
            ContentType: contentType
        })
    );
    
    const imageUrl = `https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/${key}`;
    return imageUrl;
}

export async function uploadImageEvent(fileBuffer, contentType, filename) {
    const key = `event-images/${Date.now()}-${filename}`;
    
    await r2.send(
        new PutObjectCommand({
            Bucket: "nusphere-posts",
            Key: key,
            Body: fileBuffer,
            ContentType: contentType
        })
    );
    
    const imageUrl = `https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/${key}`;
    return imageUrl;
}

export async function uploadImageModule(fileBuffer, contentType, filename) {
    const key = `modules-images/${Date.now()}-${filename}`;
    
    await r2.send(
        new PutObjectCommand({
            Bucket: "nusphere-posts",
            Key: key,
            Body: fileBuffer,
            ContentType: contentType
        })
    );
    
    const imageUrl = `https://pub-328fe6c241af430eac6949cf2766cbe1.r2.dev/${key}`;
    return imageUrl;
}

