import { v2 as cloudinary } from "cloudinary";
import  fs from "fs/promises"
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: "dvd8atowq",
    api_key:`${process.env.CLOUDINARY_API_KEY}`,
    api_secret:`${process.env.CLOUDINARY_SECRET_KEY}`,
});

export const uploadCloudinary = async (path) => {
    // console.log(process.env.CLOUDINARY_API_KEY)
    try {
        if (!path) return null;
        const response = await cloudinary.uploader.upload(path, {
            resource_type: "auto",
        });
      await fs.unlink(path)
        return response;
      
    } catch (err) {
       
        console.log(err)
        await fs.unlink(path);
    }
};
