import { Context } from 'koa';
import fs from 'fs';
import path from 'path';
import DistributorUser from '../models/DistributorUser';
import DistributorDocuments from '../models/DistributorDocuments';

export const createDistributor = async (ctx: Context) => {
    try {
        const { fullName, companyName, email, password, mobileNumber, location, distributorId } = ctx.request.body as any;

        if (!fullName || !companyName || !email || !password || !mobileNumber || !location) {
            ctx.body = { status: 2, message: "Required all parameters..." };
            return;
        }

        // Check if the mobile number already exists
        const userFound = await DistributorUser.findOne({ where: { mobileNumber, deleteStatus: 1 } });
        if (userFound) {
            ctx.body = { status: 2, message: "Mobile Number already exists..." };
            return;
        }

        // Create the user/distributor
        await DistributorUser.create({
            fullName,
            companyName,
            email,
            password,
            mobileNumber,
            location,
            distributorId,
            deleteStatus: 1,
            paymentStatus: 0,
            createdAt: new Date(),
        });
        ctx.body = { status: 1, message: "Success", data: [] };
    } catch (error) {
        console.error('Error:', error);
        ctx.status = 400;
        ctx.body = { status: 3, message: "Something went wrong", data: [] };
    }
};


export const createImages = async (ctx: Context) => {
    const { images, distributorId } = ctx.request.body as any;

    // Basic validation for required fields
    if (!images || !distributorId) {
        ctx.status = 400;
        ctx.body = { status: 2, message: 'Images or distributorId missing in the request body' };
        return;
    }

    // Insert images into user_image table
    try {
        // find the previous position of image
        await DistributorDocuments.create({
            distributorId: distributorId,
            deleteStatus: 1,
            filePath: images,
            banner: 1
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
        const { fullName, companyName, passoword, email, mobileNumber, location, distributorId } = ctx.request.body as any;

        // Check if distributorId is provided
        if (!distributorId) {
            ctx.status = 400;
            ctx.body = { status: 2, message: "Distributor ID is required", data: [] };
            return;
        }

        // Prepare the update payload
        const updateData: any = {
            fullName,
            companyName,
            email,
            mobileNumber,
            location,
            passoword,
            updatedAt: new Date(), // Update the timestamp when modifying the record
        };

        // Perform the update operation
        const [affectedRows] = await DistributorUser.update(updateData, { where: { distributorId: distributorId } });

        // Check if the update was successful
        if (affectedRows === 0) {
            ctx.status = 404;
            ctx.body = { status: 2, message: "User not found or nothing to update", data: [] };
            return;
        }

        ctx.body = { status: 1, message: "Profile updated successfully", data: [] };
    } catch (error) {
        console.error('Error:', error);
        ctx.status = 500;
        ctx.body = { status: 3, message: "Something went wrong", data: [] };
    }
};

export const distributorLogin = async (ctx: Context) => {
    try {
        const { distributorId, password } = ctx.query as any;
        // Validate input
        if (!distributorId || !password) {
            ctx.status = 400;
            ctx.body = { status: 2, message: "Distributor ID and password are required", data: [] };
            return;
        }

        // Find the user by distributorId and password
        const user = await DistributorUser.findOne({
            where: {
                distributorId,
                password
            }
        });

        if (!user) {
            ctx.body = { status: 2, message: "User not found", data: [] };
            return;
        }

        // Return user details
        ctx.body = { status: 1, message: "Success", data: user };
    } catch (error: any) {
        ctx.status = 500;
        ctx.body = { status: 3, message: "Something went wrong", data: [] };
    }
};
export const getUserDetailsById = async (ctx: Context) => {
    try {
        const { distributorId } = ctx.query as { distributorId?: string };

        // Validate input
        if (!distributorId) {
            ctx.status = 400;
            ctx.body = { status: 2, message: "Distributor ID required", data: [] };
            return;
        }

        const user = await DistributorUser.findOne({
            attributes: [
                'id',
                'fullName',
                'companyName',
                'email',
                'mobileNumber',
                'location',
                'distributorId',
                'paymentStatus',
                'deleteStatus',
                'createdAt'
            ],
            where: { distributorId: distributorId },
            include: [
                {
                    model: DistributorDocuments,
                    as: 'documents',
                    attributes: [
                        'filePath', // Adjust attributes as needed
                        'fileName',
                        'banner',
                        'deleteStatus'
                    ]
                }
            ]
        });
        

        if (!user) {
            ctx.status = 404;
            ctx.body = { status: 2, message: "User not found", data: [] };
            return;
        }

        // Return user details along with documents
        ctx.body = { status: 1, message: "Success", data: user };
    } catch (error) {
        console.error(error); // Log the error for debugging
        ctx.status = 500;
        ctx.body = { status: 3, message: "Something went wrong", data: [] };
    }
};


