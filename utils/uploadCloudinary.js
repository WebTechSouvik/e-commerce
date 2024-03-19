import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: "dvd8atowq",
    api_key: "128246261791676",
    api_secret: "Z0NH8kXA7ioDvXYkdE_eQdL_8_U",
});

export const uploadCloudinary = async (path) => {
    try {
        if (!path) return null;
        const response = await cloudinary.uploader.upload(path, {
            resource_type: "auto",
        });
        await fs.unlink(path);
        return response;
      
    } catch (err) {
       

        await fs.unlink(path);
    }
};
