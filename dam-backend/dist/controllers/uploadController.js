"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const awsConfig_1 = require("../utils/awsConfig");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    const fileStream = fs_1.default.createReadStream(file.path);
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Add your bucket name to .env
        Key: file.filename + path_1.default.extname(file.originalname), // Preserve the file extension
        Body: fileStream,
    };
    try {
        const result = yield awsConfig_1.s3.upload(uploadParams).promise();
        // Optionally, save file info to the database
        res.json({ fileUrl: result.Location });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
    finally {
        fs_1.default.unlinkSync(file.path); // Delete the file from the server after upload
    }
});
exports.uploadFile = uploadFile;
