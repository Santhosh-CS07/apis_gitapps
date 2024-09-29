import { Context } from 'koa';
import BureauUser from '../models/BureauUser';
import { Op } from 'sequelize';
import path from 'path';
import BureauDocuments from '../models/BureauDocuments';



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

export const createImages = async (ctx: Context) => {
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
            order:[['id', 'DESC']],
            raw: true
        });

        console.log("users:", users);

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

