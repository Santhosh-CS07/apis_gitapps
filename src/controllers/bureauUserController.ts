import { Context } from 'koa';
import BureauUser from '../models/BureauUser';
import { Op } from 'sequelize';
import path from 'path';
import BureauDocuments from '../models/BureauDocuments';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames
import { Buffer } from 'buffer'; // For converting base64 to binary



export const createBureauUsers = async (ctx: Context) => {
    try {
        const {
            email,
            password,
            ownerName,
            mobileNumber,
            bureauName,
            location,
            about,
            bureauId,
            distributorId,
            paymentStatus,
            expiryDate
        } = ctx.request.body as any;

        if (!ctx.request.body) {
            ctx.body = { status: 0, message: "Request body is missing", data: [] };
            return;
        };
        if (!email || !password || !ownerName || !mobileNumber) {
            ctx.body = { status: 0, message: "Required fields are missing", data: [] };
            return;
        }

        // Check if the email or mobile number already exists
        const existingUser = await BureauUser.findOne({
            where: {
                [Op.or]: [{ email }, { mobileNumber }],
                deleteStatus: 1
            },
        });

        if (existingUser) {
            ctx.body = { status: 2, message: "User already exists", data: [] };
            return;
        }

        const user = await BureauUser.create({
            email,
            password,
            ownerName,
            bureauName,
            mobileNumber,
            location,
            about,
            bureauId,
            distributorId,
            deleteStatus: 1,
            paymentStatus: paymentStatus ? paymentStatus : 0,
            createdAt: new Date(),
            expiryDate
        });
        ctx.body = { status: 1, message: "Successfully Created", data: user };

    } catch (error: any) {
        ctx.status = 400;
        ctx.body = { status: 0, message: error.message, data: [] };
    }
};

export const createImages_ = async (ctx: Context) => {
    const { images, bureauId, order } = ctx.request.body as any;

    // Basic validation for required fields
    if (!images || !bureauId) {
        ctx.status = 400;
        ctx.body = { status: 2, message: 'Images or bureauId missing in the request body' };
        return;
    }

    // Insert images into user_image table
    try {
        await BureauDocuments.create({
            bureauId: bureauId,
            deleteStatus: 1,
            filePath: images,
            banner: order
        });

        ctx.status = 200;
        ctx.body = { status: 1, message: 'Images inserted successfully' };
    } catch (err: any) {
        ctx.status = 400;
        console.error("Error inserting Distributor images:", err);
        ctx.body = { status: 3, message: 'Error inserting Distributor images', error: err.message };
        return;
    }
};
export const createImages = async (ctx: Context) => {
    const { bureauId,order, images } = ctx.request.body as any;

    // Ensure the request contains an array of base64 images
    if (ctx.request.method === 'POST') {
        // Define the destination directory: uploads/users/{matriId}/
        const userUploadsDir = path.join(__dirname, '../uploads/bureauUsers', String(bureauId)); // Convert matriId to string

        // Create the uploads/users/{matriId} directory if it doesn't exist
        if (!fs.existsSync(userUploadsDir)) {
            fs.mkdirSync(userUploadsDir, { recursive: true });
        }

        try {
                const base64Image = images;

                // Extract the base64 data
                const match = base64Image.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
                if (!match) {
                    throw new Error(`Invalid image format at index`);
                }

                const extension = match[1]; // Get the file extension
                const base64Data = match[2]; // Get the base64 string

                // Generate a unique filename for each image
                const filename = `${uuidv4()}.${extension}`;

                // Generate the full path where the image will be saved
                const filePath = path.join(userUploadsDir, filename);

                // Convert base64 data to binary and write the file
                const imageBuffer = Buffer.from(base64Data, 'base64');
                fs.writeFileSync(filePath, imageBuffer);

                // Insert the image data into the `user_image` table
                await BureauDocuments.create({
                    filePath: `bureauUsers/${bureauId}/${filename}`, // Path to saved image
                    bureauId: bureauId,
                    banner: order,
                    deleteStatus: 1
                });

            ctx.status = 200;
            ctx.body = { status: 1, message: 'Images inserted and stored successfully' };
        } catch (err: any) {
            ctx.status = 400;
            console.error("Error inserting and storing user images:", err);
            ctx.body = { status: 3, message: 'Error inserting bureau images', error: err.message };
        }
    } else {
        ctx.body = { status: 3, message: 'Please provide an array of base64 images.' };
    }
};

export const updateProfile = async (ctx: Context) => {
    try {
        const {
            email,
            password,
            ownerName,
            mobileNumber,
            bureauName,
            location,
            about,
            bureauId,
        } = ctx.request.body as any;

        const user = await BureauUser.update({
            email,
            password,
            ownerName,
            bureauName,
            mobileNumber,
            location,
            about,
            createdAt: new Date(),
        }, { where: { bureauId: bureauId } });

        ctx.body = { status: 1, message: "Successfully Created", data: user };

    } catch (error: any) {
        ctx.status = 400;
        ctx.body = { status: 0, message: error.message, data: [] };
    }
};


export const getBureauUsers = async (ctx: Context) => {
    const { distributorId } = ctx.query as any;

    if (!distributorId) {
        ctx.status = 400;
        ctx.body = { status: 3, message: "Distributor ID is required", data: [] };
        return;
    }
    try {
        // Ensure distributorId is correctly formatted if necessary
        const users = await BureauUser.findAll({
            where: {
                distributorId: distributorId
            },
            order: [['id', 'DESC']],
            raw: true
        });
        if (users.length === 0) {
            ctx.body = { status: 2, message: "No users found", data: [] };
        } else {
            ctx.body = { status: 1, message: "Successfully Fetched", data: users };
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        ctx.status = 500;
        ctx.body = { status: 3, message: "Failed to fetch bureau users", data: [] };
    }
};

export const bureauLogin = async (ctx: Context) => {
    try {
        const { bureauId, password } = ctx.query as { bureauId?: string, password?: string };

        // Validate input
        if (!bureauId || !password) {
            ctx.status = 400;
            ctx.body = { status: 2, message: "Bureau ID and password are required.", data: [] };
            return;
        }

        // Find the user by bureauId and password
        const user = await BureauUser.findOne({ where: { bureauId, password } });
        // Check if the user was found
        if (!user) {
            ctx.status = 401; // Unauthorized
            ctx.body = { status: 2, message: "Invalid Bureau ID or password.", data: [] };
            return;
        }

        // Login successful
        ctx.body = { status: 1, message: "Login successful.", data: user };
    } catch (error: any) {
        console.error('Error during bureau login:', error);
        ctx.status = 500;
        ctx.body = { status: 3, message: "Internal server error.", data: [] };
    }
};

export const getBureauData = async (ctx: Context) => {
    const { bureauId } = ctx.query as any;

    if (!bureauId) {
        ctx.status = 400;
        ctx.body = { status: 3, message: "bureauId is required", data: [] };
        return;
    }
    try {
        // Ensure distributorId is correctly formatted if necessary
        const users = await BureauUser.findOne({
            where: {
                bureauId: bureauId,
                deleteStatus:1
            },
            include:[{
                model: BureauDocuments,
                as:"bureauImages",
                where:{deleteStatus:1},
                required:false
            }],
        });
        if (!users) {
            ctx.body = { status: 2, message: "No users found", data: [] };
        } else {
            ctx.body = { status: 1, message: "Successfully Fetched", data: users };
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        ctx.status = 500;
        ctx.body = { status: 3, message: "Failed to fetch bureau users", data: [] };
    }
};

