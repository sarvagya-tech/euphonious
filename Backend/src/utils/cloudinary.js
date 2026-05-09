import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        return null;
    }

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error('Failed to cleanup temp upload:', err.message);
            }
        });

        return response;
    } catch (error) {
        fs.unlink(localFilePath, () => { });
        throw error;
    }
};

export { uploadOnCloudinary };
