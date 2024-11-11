import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import multer from "multer";
import AWS from "aws-sdk";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const userRepository = AppDataSource.getRepository(User); // Updated
    const user = await userRepository.findOne({
      where: { id: userId },
      select: ["id", "name", "email", "profilePictureUrl"],
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfilePicture = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const userRepository = AppDataSource.getRepository(User); // Updated
    const user = await userRepository.findOne({
      where: { id: userId },
      select: ["profilePictureUrl"],
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ profilePictureUrl: user.profilePictureUrl });
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadProfilePicture = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    // Configure AWS S3
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `profile-pictures/${userId}/${file.originalname}`,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
    };

    try {
      const data = await s3.upload(params).promise();

      const userRepository = AppDataSource.getRepository(User); // Updated
      await userRepository.update(userId, { profilePictureUrl: data.Location });

      res.json({ profilePictureUrl: data.Location });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).json({ message: "Server error" });
    } finally {
      fs.unlinkSync(file.path);
    }
  },
];

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user.id;
  const { name, email } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User); // Updated
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await userRepository.save(user);

    res.json({ message: "User profile updated", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
