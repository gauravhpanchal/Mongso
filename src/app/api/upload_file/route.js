import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_USER_KEY_ID,
    secretAccessKey: process.env.AWS_USER_SECRET_KEY,
  },
});

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;
  console.log(fileName);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/png",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const getCommand = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 36000 });

  return url;
}

export async function POST(request) {
  try {
    // console.log(request);
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
