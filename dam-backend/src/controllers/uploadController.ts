import { Request, Response } from "express";
import { s3 } from "../utils/awsConfig";
import fs from "fs";
import path from "path";
import { getRepository } from "typeorm";
import { Asset } from "../entities/Asset";

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: "No file uploaded." });
    return;
  }

  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: file.filename + path.extname(file.originalname),
    Body: fileStream,
  };

  try {
    const result = await s3.upload(uploadParams).promise();

    // Save file info to the database
    const assetRepository = getRepository(Asset);
    const newAsset = assetRepository.create({
      userId: (req as any).user.id,
      fileUrl: result.Location,
      fileName: file.originalname,
    });
    await assetRepository.save(newAsset);

    res.json({ fileUrl: result.Location });
  } catch (error) {
    // Type guard to check if the error is an instance of Error
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  } finally {
    fs.unlinkSync(file.path);
  }
};

export const listAssets = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const assetRepository = getRepository(Asset);
    const assets = await assetRepository.find({ where: { userId } });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
