import { Context } from 'koa';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames
import { Buffer } from 'buffer'; // For converting base64 to binary
import User from '../models/User';
import UsersAge from '../models/UsersAge';
import UsersCaste from '../models/UsersCaste';
import UsersSubCaste from '../models/UsersSubCaste';
import EducationList from '../models/EducationList';
import AnnualIncome from '../models/AnnualIncome';
import UsersCity from '../models/UsersCity';
import UsersState from '../models/UserState';
import UsersCountry from '../models/UsersCountry';
import UsersWeight from '../models/UsersWeight';
import UsersHeight from '../models/UsersHeight';
import UsersExtraSkills from '../models/UsersExtraSkills';
import UsersOccupation from '../models/UsersOccupation';
import UsersRaasiStar from '../models/UsersRaasiStar';
import UsersStar from '../models/UsersStar';
import UsersRaasi from '../models/UsersRaasi';
import UserImages from '../models/UserImages';
import UserProfessionalDetails from '../models/UserProfessionalDeatils';
import ReligionDetails from '../models/ReligionDetails';
import FamilyDetails from '../models/FamilyDetails';
import FamilyPropertyDetails from '../models/FamilyPropertyDetails';
import LocationDetails from '../models/LocationDetails';
import PartnerPrefrence from '../models/PartnerPrefrence';
import BureauUser from '../models/BureauUser';
import PartnerPreference from '../models/PartnerPrefrence';

export const createUser = async (ctx: Context) => {
    try {
        const {
            personalDetails,
            personalDetailsTwo,
            religionDetails,
            professionalDetails,
            familyDetails,
            familyPropertyDetailsOne,
            familyPropertyDetailsTwo,
            locationDetails,
            partnerPreferenceDetails
        } = ctx.request.body as any;
        // inserting personalDetails and personalDetailsTwo data into a user table
        const userPersonalData: any = {
            email: personalDetails?.email || "Any",
            password: personalDetails?.password || "Any",
            mobileNumber: personalDetails?.mobileNumber || "Any",
            gender: personalDetails?.gender || "Any",
            imagePrivacy: personalDetails?.imagePrivacy || "Any",
            createdBy: personalDetails?.createdBy_ || "Any",
            bureauId: personalDetails?.bureauId || "Any",
            matriId: personalDetails?.matriId || "Any",
            name: personalDetailsTwo?.fullName || "Any",
            dateOfBirth: personalDetailsTwo?.dateOfBirth || "Any",
            birthTime: personalDetailsTwo?.birthTime || "Any",
            height: personalDetailsTwo?.height_ || "Any",
            weight: personalDetailsTwo?.weight_ || "Any",
            maritalStatus: personalDetailsTwo?.maritalStatus_ || "Any",
            bodyType: personalDetailsTwo?.bodyType || "Any",
            smokingHabit: personalDetailsTwo?.smokingHabit || "Any",
            drinkingHabit: personalDetailsTwo?.drinkingHabit || "Any",
            eatingHabit: personalDetailsTwo?.eatingHabit || "Any",
            physicalStatus: personalDetailsTwo?.physicalStatus || "Any",
            age: personalDetailsTwo?.age || "Any",
            shortList: 0,
            maleKids: personalDetailsTwo?.maleKids || "Any",
            femaleKids: personalDetailsTwo?.femaleKids || "Any",
            kidsWith: personalDetailsTwo?.kidsWith || "Any",
            paymentStatus: personalDetails?.paymentStatus || "Any"
        };
        let personalData: any;
        try {
            personalData = await User.create(userPersonalData);
            console.log("User created successfully:");
        } catch (err: any) {
            ctx.status = 400;
            console.error("Error inserting personal data:", err);
            ctx.body = { status: 3, message: 'Error inserting personal data', error: err.message };
            return;
        }

        if (personalData) {
            // Religious data insertion
            const religionData: any = {
                caste: religionDetails?.caste_ || "Any",
                subCaste: religionDetails?.subCaste_ || "Any",
                gotram: religionDetails?.gotram || "Any",
                raasi: religionDetails?.raasi_ || "Any",
                star: religionDetails?.star_ || "Any",
                raasiStar: religionDetails?.raasiStar_ || "Any",
                religion: religionDetails?.religion || "Any",
                languagesKnown: religionDetails?.languagesKnown?.length > 0 ? religionDetails.languagesKnown.join(', ') : "Any",
                motherTongue: religionDetails?.motherTongue || "Any",
                matriId: personalDetails?.matriId || "Any"
            };

            try {
                await ReligionDetails.create(religionData);
            } catch (err: any) {
                ctx.status = 400;
                console.error("Error inserting religion details:", err);
                ctx.body = { status: 3, message: 'Error inserting religion details', error: err.message };
                return;
            }

            // Professional data insertion
            const professionalData: any = {
                education: professionalDetails?.education || "Any",
                employedStatus: professionalDetails?.employedStatus || "Any",
                occupation: professionalDetails?.occupation || "Any",
                annualIncome: professionalDetails?.annualIncome || "Any",
                jobLocation: professionalDetails?.jobLocation || "Any",
                business: professionalDetails?.business || "Any",
                businessLocation: professionalDetails?.businessLocation?.length > 0 ? professionalDetails.businessLocation.join(', ') : "Any",
                businessIncome: professionalDetails?.businessIncome || "Any",
                skills: professionalDetails?.skills?.length > 0 ? professionalDetails.skills.join(', ') : "Any",
                matriId: personalDetails?.matriId || "Any"
            };

            try {
                await UserProfessionalDetails.create(professionalData);
            } catch (err: any) {
                ctx.status = 400;
                console.error("Error inserting professional details:", err);
                ctx.body = { status: 3, message: 'Error inserting professional details', error: err.message };
                return;
            }

            // Family data insertion
            const familyData: any = {
                fatherEmployed: familyDetails?.fatherEmployed || "Any",
                fatherOccupation: familyDetails?.fatherOccupation || "Any",
                motherEmployed: familyDetails?.motherEmployed || "Any",
                motherOccupation: familyDetails?.motherOccupation || "Any",
                brothers: familyDetails?.brothers || "Any",
                brothersMarried: familyDetails?.brothersMarried || "Any",
                sisters: familyDetails?.sisters || "Any",
                sistersMarried: familyDetails?.sistersMarried || "Any",
                familyValues: familyDetails?.familyValues || "Any",
                familyType: familyDetails?.familyType || "Any",
                familyStatus: familyDetails?.familyStatus || "Any",
                originalLocation: familyDetails?.originalLocation || "Any",
                settledLocation: familyDetails?.settledLocation || "Any",
                matriId: personalDetails?.matriId || "Any"
            };

            try {
                await FamilyDetails.create(familyData);
            } catch (err: any) {
                ctx.status = 400;
                console.error("Error inserting family details:", err);
                ctx.body = { status: 3, message: 'Error inserting family details', error: err.message };
                return;
            }

            // Family property data insertion
            const familyPropertyDeatils: any = {
                ownHouseItems: familyPropertyDetailsOne?.ownHouseItems || "Any",
                ownHouseSqFeet: familyPropertyDetailsOne?.ownHouseSqFeet || "Any",
                totalValue: familyPropertyDetailsOne?.totalValue || "Any",
                monthlyRents: familyPropertyDetailsOne?.monthlyRents || "Any",
                ownHouseLocations: familyPropertyDetailsOne?.ownHouseLocations?.length > 0 ? familyPropertyDetailsOne.ownHouseLocations.join(", ") : "Any",
                openPlots: familyPropertyDetailsOne?.openPlots || "Any",
                openPlotsSqFeet: familyPropertyDetailsOne?.openPlotsSqFeet || "Any",
                openPlotsTotalValue: familyPropertyDetailsOne?.openPlotsTotalValue || "Any",
                openPlotsLocations: familyPropertyDetailsOne?.openPlotsLocations?.length > 0 ? familyPropertyDetailsOne.openPlotsLocations.join(", ") : "Any",
                apartment: familyPropertyDetailsTwo?.apartment || "Any",
                flatsTotalValue: familyPropertyDetailsTwo?.flatsTotalValue || "Any",
                flatsLocation: familyPropertyDetailsTwo?.flatsLocation?.length > 0 ? familyPropertyDetailsTwo.flatsLocation.join(", ") : "Any",
                agricultureLand: familyPropertyDetailsTwo?.agricultureLand || "Any",
                agricultureLandTotalValue: familyPropertyDetailsTwo?.agricultureLandTotalValue || "Any",
                agricultureLandLocation: familyPropertyDetailsTwo?.agricultureLandLocation?.length > 0 ? familyPropertyDetailsTwo.agricultureLandLocation.join(", ") : "Any",
                moreProperties: familyPropertyDetailsTwo?.moreProperties || "Any",
                totalPropertyValue: familyPropertyDetailsTwo?.totalPropertyValue || "Any",
                matriId: personalDetails?.matriId || "Any"
            };

            try {
                await FamilyPropertyDetails.create(familyPropertyDeatils);
            } catch (err: any) {
                ctx.status = 400;
                console.error("Error inserting family property details:", err);
                ctx.body = { status: 3, message: 'Error inserting family property details', error: err.message };
                return;
            }

            // Location data insertion
            const locatinDetailsData: any = {
                country: locationDetails?.country_ || "Any",
                state: locationDetails?.state_ || "Any",
                city: locationDetails?.city || "Any",
                citizenship: locationDetails?.citizenship || "Any",
                matriId: personalDetails?.matriId || "Any"
            };

            try {
                await LocationDetails.create(locatinDetailsData);
            } catch (err: any) {
                ctx.status = 400;
                console.error("Error inserting location details:", err);
                ctx.body = { status: 3, message: 'Error inserting location details', error: err.message };
                return;
            };
            const getPreferenceValue = (preference: any) => {
                return Array.isArray(preference) && preference.length > 0 ? preference.join('|') : 'Any';
            };

            const preferenceData: any = {
                matriId: personalDetails?.matriId,
                servicePreference: getPreferenceValue(partnerPreferenceDetails.servicePreference),
                createdByPreference: getPreferenceValue(partnerPreferenceDetails.createdByPreference),
                religionPreference: getPreferenceValue(partnerPreferenceDetails.religionPreference),
                castePreference: partnerPreferenceDetails.castePreference.join('|') || "Caste No Bar",
                subCastePreference: getPreferenceValue(partnerPreferenceDetails.subCastePreference),
                maritalStatusPreference: getPreferenceValue(partnerPreferenceDetails.maritalStatusPreference),
                childrenPreference: getPreferenceValue(partnerPreferenceDetails.childrenPreference),
                motherTonguePreference: getPreferenceValue(partnerPreferenceDetails.motherTonguePreference),
                educationPreference: getPreferenceValue(partnerPreferenceDetails.educationPreference),
                employeePreference: getPreferenceValue(partnerPreferenceDetails.employeePreference),
                jobLocationPreference: getPreferenceValue(partnerPreferenceDetails.jobLocationPreference),
                annualIncomePreference: getPreferenceValue(partnerPreferenceDetails.annualIncomePreference),
                familyPreference: getPreferenceValue(partnerPreferenceDetails.familyPreference),
                settledLocationPreference: getPreferenceValue(partnerPreferenceDetails.settledLocationPreference),
                ownHousePreference: getPreferenceValue(partnerPreferenceDetails.ownHousePreference),
                sftPreference: getPreferenceValue(partnerPreferenceDetails.sftPreference),
                monthlyRentsPreference: getPreferenceValue(partnerPreferenceDetails.monthlyRentsPreference),
                openPlotsLandsPreference: getPreferenceValue(partnerPreferenceDetails.openPlotsLandsPreference),
                apartmentFlatsPreference: getPreferenceValue(partnerPreferenceDetails.apartmentFlatsPreference),
                propertyLocationPreference: getPreferenceValue(partnerPreferenceDetails.propertyLocationPreference),
                countryPreference: getPreferenceValue(partnerPreferenceDetails.countryPreference),
                statePreference: getPreferenceValue(partnerPreferenceDetails.statePreference),
                cityPreference: getPreferenceValue(partnerPreferenceDetails.cityPreference),
                citizenshipPreference: getPreferenceValue(partnerPreferenceDetails.citizenshipPreference),
                occupationPrefrence: getPreferenceValue(partnerPreferenceDetails.occupationPrefrence),
                annualIncomeTo: partnerPreferenceDetails.annualIncomeTo || 'Any',
                annualIncomeFrom: partnerPreferenceDetails.annualIncomeFrom || 'Any',
                propertyValueTo: partnerPreferenceDetails.propertyValueTo || 'Any',
                propertyValueFrom: partnerPreferenceDetails.propertyValueFrom || 'Any',
                agricultureLandPreferenceTo: partnerPreferenceDetails.agricultureLandPreferenceTo || 'Any',
                agricultureLandPreferenceFrom: partnerPreferenceDetails.agricultureLandPreferenceFrom || 'Any',
                ageFrom: partnerPreferenceDetails.ageFrom,
                ageTo: partnerPreferenceDetails.ageTo,
                heightFrom: partnerPreferenceDetails.heightFrom,
                heightTo: partnerPreferenceDetails.heightTo,
            };

            // Insert the data into the database
            try {
                const partnerPreference = await PartnerPreference.create(preferenceData);
                ctx.body = { status: 1, message: 'Partner preferences created successfully', data: personalDetails?.matriId };
            } catch (err: any) {
                ctx.status = 400;
                console.error("Error inserting PartnerPreference details:", err);
                ctx.body = { status: 3, message: 'Error inserting PartnerPreference details', error: err.message };
            }
        } else {
            ctx.body = { status: 3, message: 'User creation failed' };
        }
    } catch (err: any) {
        console.error("Unexpected error:", err);
        ctx.body = { status: 500, message: 'Unexpected error occurred', error: err.message };
    }
};

// export const createImages = async (ctx: Context) => {
//     const { matriId, order } = ctx.request.body as any; // Extract matriId and order from request body

//     // Ensure the request is a POST method and contains a file
//     if (ctx.request.method === 'POST' && ctx.request.files && ctx.request.files.file) {
//         const file: any = ctx.request.files.file;  // Get the uploaded file from formData

//         // Define the destination directory: uploads/users/{matriId}/
//         const userUploadsDir = path.join(__dirname, '../uploads/users', matriId);

//         // Create the uploads/users/{matriId} directory if it doesn't exist
//         if (!fs.existsSync(userUploadsDir)) {
//             fs.mkdirSync(userUploadsDir, { recursive: true });
//         }

//         try {
//             // Ensure the file has a temporary path
//             const tempFilePath = file.filepath; // Temporary path in temp_upload

//             if (!tempFilePath) {
//                 throw new Error(`Temporary path not found for the uploaded file.`);
//             }

//             // Generate the new file path: uploads/users/{matriId}/{filename}
//             const newFilePath = path.join(userUploadsDir, file.newFilename);

//             // Move the file from temp_upload to the desired folder
//             fs.renameSync(tempFilePath, newFilePath);

//             // Insert the image data into the `user_image` table
//             await UserImages.create({
//                 image: `/${matriId}/${file.newFilename}`, // Path to saved image
//                 matriId: matriId,
//                 position: order,
//                 deleteStatus: 1
//             });

//             // Respond with success
//             ctx.status = 200;
//             ctx.body = { status: 1, message: 'Image inserted and moved successfully' };
//         } catch (err: any) {
//             // Handle any errors that occur during the process
//             ctx.status = 400;
//             console.error("Error inserting and moving user image:", err);
//             ctx.body = { status: 3, message: 'Error inserting user image', error: err.message };
//         }
//     } else {
//         ctx.body = { status: 3, message: 'Please upload a file.' };
//     }
// };

export const createImages = async (ctx: Context) => {
    const { matriId, images } = ctx.request.body as any;

    // Ensure the request contains an array of base64 images
    if (ctx.request.method === 'POST' && images && Array.isArray(images)) {
        // Define the destination directory: uploads/users/{matriId}/
        const userUploadsDir = path.join(__dirname, '../uploads/users', String(matriId)); // Convert matriId to string

        // Create the uploads/users/{matriId} directory if it doesn't exist
        if (!fs.existsSync(userUploadsDir)) {
            fs.mkdirSync(userUploadsDir, { recursive: true });
        }

        try {
            // Loop through each base64 image in the array
            for (let i = 0; i < images.length; i++) {
                const base64Image = images[i];
                const order = i + 1; // Use the index as the order (or modify as needed)

                // If the image is null, create a record with null value
                if (base64Image === null) {
                    await UserImages.create({
                        image: "", // Placeholder for the null image
                        matriId: matriId,
                        position: order,
                        deleteStatus: 1
                    });
                    continue; // Skip to the next iteration
                }

                if (typeof base64Image !== 'string') {
                    throw new Error(`Invalid base64 image at index ${i}`);
                }

                // Extract the base64 data
                const match = base64Image.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
                if (!match) {
                    throw new Error(`Invalid image format at index ${i}`);
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
                await UserImages.create({
                    image: `users/${matriId}/${filename}`, // Path to saved image
                    matriId: matriId,
                    position: order,
                    deleteStatus: 1
                });
            }

            ctx.status = 200;
            ctx.body = { status: 1, message: 'Images inserted and stored successfully' };
        } catch (err: any) {
            ctx.status = 400;
            console.error("Error inserting and storing user images:", err);
            ctx.body = { status: 3, message: 'Error inserting user images', error: err.message };
        }
    } else {
        ctx.body = { status: 3, message: 'Please provide an array of base64 images.' };
    }
};


export const updateImages = async (ctx: Context) => {
    const { matriId, images } = ctx.request.body as any;

    // Ensure the request contains an array of base64 images
    if (ctx.request.method === 'PUT' && images && Array.isArray(images)) {
        // Define the destination directory: uploads/users/{matriId}/
        const userUploadsDir = path.join(__dirname, '../uploads/users', String(matriId)); // Convert matriId to string

        // Create the uploads/users/{matriId} directory if it doesn't exist
        if (!fs.existsSync(userUploadsDir)) {
            fs.mkdirSync(userUploadsDir, { recursive: true });
        }

        try {
            // Loop through each base64 image in the array
            for (let i = 0; i < images.length; i++) {
                const base64Image = images[i]?.image;
                const id:any = images[i].id;
                const order = images[i]?.position; // Use the index as the order (or modify as needed)

                if (!base64Image || typeof base64Image !== 'string') {
                    throw new Error(`Invalid base64 image at index ${i}`);
                }

                // Extract the base64 data
                const match = base64Image.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
                if (!match) {
                    throw new Error(`Invalid image format at index ${i}`);
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
                await UserImages.update({
                    image: `users/${matriId}/${filename}`, // Path to saved image
                    position: order,
                    deleteStatus: 1
                },{where: {id: id}});
            }

            ctx.status = 200;
            ctx.body = { status: 1, message: 'Images inserted and stored successfully' };
        } catch (err: any) {
            ctx.status = 400;
            console.error("Error inserting and storing user images:", err);
            ctx.body = { status: 3, message: 'Error inserting user images', error: err.message };
        }
    } else {
        ctx.body = { status: 3, message: 'Please provide an array of base64 images.' };
    }
};



export const getSearchData = async (ctx: Context) => {
    const { caste, country, maritalStatus, state, gender, city } = ctx.request.body as any;

    try {
        // Construct dynamic where clauses for filtering
        const whereConditions: any = {
            deleteStatus: 1,
        };

        if (gender && gender.length > 0) {
            whereConditions.gender = gender; // Filter by gender
        }

        if (maritalStatus && maritalStatus.length > 0) {
            whereConditions.maritalStatus = maritalStatus; // Filter by marital status
        }

        const locationWhereConditions: any = {};
        if (country && country.length > 0) {
            locationWhereConditions.country = country; // Filter by country
        }
        if (state && state.length > 0) {
            locationWhereConditions.state = state; // Filter by state
        }
        if (city && city.length > 0) {
            locationWhereConditions.city = city; // Filter by city
        }

        const religionWhereConditions: any = {};
        if (caste && caste.length > 0) {
            religionWhereConditions.caste = caste; // Filter by caste
        }

        // Perform the query
        const users = await User.findAll({
            where: whereConditions,
            attributes: ['name', 'matriId', 'age', 'height', 'createdBy'],
            order: [['id', 'DESC']],
            include: [
                {
                    model: UserProfessionalDetails,
                    as: 'professionalDetails',
                    attributes: ['education', 'occupation', 'annualIncome'],
                },
                {
                    model: LocationDetails,
                    as: 'locationDetails',
                    attributes: ['country', 'state', 'city'],
                    where: locationWhereConditions, // Add location filter conditions
                },
                {
                    model: ReligionDetails,
                    as: 'religionDeails',
                    attributes: ['caste'],
                    where: religionWhereConditions, // Add religion filter conditions
                },
                {
                    model: UserImages,
                    as: 'images',
                    attributes: ['image', 'position'],
                },
            ],
        });

        // Send success response
        ctx.body = { status: 1, message: 'Success', data: users };
    } catch (error: any) {
        // Send error response
        ctx.status = 400;
        ctx.body = { status: 0, message: error.message };
    }
};


export const getFeMaleProfiles = async (ctx: Context) => {
    const { page = 1, limit } = ctx.query as any; // Pagination parameters from query
    const offset = (page - 1) * limit;

    try {
        const users = await User.findAll({
            where: { gender: "Female", deleteStatus: 1 },
            attributes: ['name', 'matriId', 'age', 'height', 'createdBy', 'shortList'],
            order: [['id', 'DESC']],
            limit: parseInt(limit),    // Limiting the number of profiles
            offset: offset,            // Offset for pagination
            include: [
                {
                    model: UserProfessionalDetails,
                    as: 'professionalDetails',
                    attributes: ['education', 'occupation', 'annualIncome']
                },
                {
                    model: LocationDetails,
                    as: 'locationDetails',
                    attributes: ['country', 'state', 'city']
                },
                {
                    model: ReligionDetails,
                    as: 'religionDeails',
                    attributes: ['caste']
                },
                {
                    model: UserImages,
                    as: 'images',
                    attributes: ['image', 'position'],
                    limit: 1, // Limit to 1 image per user
                }
            ]
        });

        ctx.body = { status: 1, message: 'Success', data: users };
    } catch (error: any) {
        ctx.status = 400;
        ctx.body = error.message;
    }
};


// export const getFeMaleProfiles = async (ctx: Context) => {
//     try {
//         const users = await User.findAll({where:{gender:"Female", deleteStatus:1},
//             attributes:['name', 'matriId', 'age', 'height', 'createdBy', 'shortList'],
//             order: [['id', 'DESC']],
//             include:[{
//             model: UserProfessionalDetails,
//             as: 'professionalDetails',
//             attributes:['education', 'occupation', 'annualIncome']
//         }, {
//             model: LocationDetails,
//             as: 'locationDetails',
//             attributes: ['country', 'state', 'city']
//         },
//         {
//             model: ReligionDetails,
//             as: 'religionDeails',
//             attributes: ['caste']
//         },
//         {
//             model: UserImages,
//             as: 'images',
//             attributes: ['image', 'position']
//         }
//     ]});
//         ctx.body = { status: 1, message: 'Success', data: users };
//     } catch (error: any) {
//         ctx.status = 400;
//         ctx.body = error.message;
//     }
// };

export const getMaleProfiles = async (ctx: Context) => {
    try {
        const users = await User.findAll({
            where: { gender: "Male", deleteStatus: 1 },
            attributes: ['name', 'matriId', 'age', 'height', 'createdBy', 'shortList'],
            order: [['id', 'DESC']],
            include: [{
                model: UserProfessionalDetails,
                as: 'professionalDetails',
                attributes: ['education', 'occupation', 'annualIncome']
            }, {
                model: LocationDetails,
                as: 'locationDetails',
                attributes: ['country', 'state', 'city']
            },
            {
                model: ReligionDetails,
                as: 'religionDeails',
                attributes: ['caste']
            },
            {
                model: UserImages,
                as: 'images',
                attributes: ['image', 'position']
            }
            ]
        });
        ctx.body = { status: 1, message: 'Success', data: users };
    } catch (error: any) {
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getMyProfiles = async (ctx: Context) => {
    const { bureauId, gender } = ctx.query as any
    try {
        const users = await User.findAll({
            where: { gender: gender, bureauId: bureauId, deleteStatus: 1 },
            attributes: ['name', 'matriId', 'age', 'height', 'createdBy', 'mobileNumber', 'password', 'shortList'],
            order: [['id', 'DESC']],
            include: [{
                model: UserProfessionalDetails,
                as: 'professionalDetails',
                attributes: ['education', 'occupation', 'annualIncome']
            }, {
                model: LocationDetails,
                as: 'locationDetails',
                attributes: ['country', 'state', 'city']
            },
            {
                model: ReligionDetails,
                as: 'religionDeails',
                attributes: ['caste']
            },
            {
                model: UserImages,
                as: 'images',
                attributes: ['image', 'position'],
                limit: 1
            }
            ]
        });
        ctx.body = { status: 1, message: 'Success', data: users };
    } catch (error: any) {
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getShortListProfiles = async (ctx: Context) => {
    const { bureauId } = ctx.query as any;
    try {
        const users = await User.findAll({
            where: { shortList: 1, bureauId: bureauId, deleteStatus: 1 },
            attributes: ['name', 'matriId', 'age', 'height', 'createdBy'],
            order: [['id', 'DESC']],
            include: [{
                model: UserProfessionalDetails,
                as: 'professionalDetails',
                attributes: ['education', 'occupation', 'annualIncome']
            }, {
                model: LocationDetails,
                as: 'locationDetails',
                attributes: ['country', 'state', 'city']
            },
            {
                model: ReligionDetails,
                as: 'religionDeails',
                attributes: ['caste']
            },
            {
                model: UserImages,
                as: 'images',
                attributes: ['image', 'position']
            }
            ]
        });
        ctx.body = { status: 1, message: 'Success', data: users };
    } catch (error: any) {
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getUserDataById = async (ctx: Context) => {
    const { matriId } = ctx.query as any;
    try {
        const users = await User.findOne({
            where: { matriId: matriId, deleteStatus: 1 },
            attributes: ['name', 'matriId', 'age', 'height', 'createdBy'],
            include: [{
                model: UserProfessionalDetails,
                as: 'professionalDetails',
                attributes: ['education', 'occupation', 'annualIncome']
            }, {
                model: LocationDetails,
                as: 'locationDetails',
                attributes: ['country', 'state', 'city']
            },
            {
                model: ReligionDetails,
                as: 'religionDeails',
                attributes: ['caste']
            },
            {
                model: UserImages,
                as: 'images',
                attributes: ['image', 'position']
            }
            ]
        });
        ctx.body = { status: 1, message: 'Success', data: users };
    } catch (error: any) {
        ctx.status = 400;
        ctx.body = error.message;
    }
};


export const getProfileData = async (ctx: Context) => {
    const { matriId } = ctx.query as any;
    try {
        const data = await User.findOne({
            where: { matriId: matriId, deleteStatus: 1 },
            include: [{
                model: UserProfessionalDetails,
                as: 'professionalDetails'
            },
            {
                model: LocationDetails,
                as: 'locationDetails'
            },
            {
                model: ReligionDetails,
                as: 'religionDeails'
            },
            {
                model: UserImages,
                as: 'images',
                attributes: ['image', 'position', 'id'],
                where: { deleteStatus: 1 }
            },
            {
                model: FamilyDetails,
                as: 'familyDetails',
                required: false
            },
            {
                model: FamilyPropertyDetails,
                as: 'familyPropertyDetails'
            },
            {
                model: PartnerPreference,
                as: 'partnerDetails'
            },
            {
                model: BureauUser,
                as: 'bureau',
                where: { deleteStatus: 1 },
                attributes: ['mobileNumber']
            }
            ]
        }).catch((error: any) => {
            ctx.body = { status: 3, message: 'error finding data', data: [] };
            return;
        });
        if (data) {
            ctx.body = { status: 1, message: 'Success', data: data };
        } else {
            ctx.body = { status: 3, message: 'Profile Not Available', data: [] };
        }
    } catch (error: any) {
        ctx.status = 400;
        ctx.body = error.message;
    }
};




export const getAge = async (ctx: Context) => {
    try {
        // Fetch all ages from the UsersAge table
        const usersAge = await UsersAge.findAll({ raw: true, attributes: ['age'] });

        // Map the age values into an array
        const ageArray = usersAge.map(user => user.age);

        // Respond with the array of ages
        ctx.body = { status: 1, message: 'Success', data: ageArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};


export const getCaste = async (ctx: Context) => {
    try {
        const usersCaste = await UsersCaste.findAll({ raw: true, attributes: ['caste'] });

        const casteArray = usersCaste.map(user => user.caste);

        ctx.body = { status: 1, message: 'Success', data: casteArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getSubCaste = async (ctx: Context) => {
    try {
        const usersSubCaste = await UsersSubCaste.findAll({ raw: true, attributes: ['sub_caste'] });

        const subCasteArray = usersSubCaste.map(user => user.sub_caste);

        ctx.body = { status: 1, message: 'Success', data: subCasteArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getEducation = async (ctx: Context) => {
    try {
        const educationList = await EducationList.findAll({ raw: true, attributes: ['education'] });

        const educationArray = educationList.map(user => user.education);

        ctx.body = { status: 1, message: 'Success', data: educationArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getAnnualIncome = async (ctx: Context) => {
    try {
        const list = await AnnualIncome.findAll({ raw: true, attributes: ['annual_income'] });

        const itemsArray = list.map(item => item.annual_income);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getCity = async (ctx: Context) => {
    try {
        const list = await UsersCity.findAll({ raw: true, attributes: ['city'] });

        const itemsArray = list.map(item => item.city);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getCountry = async (ctx: Context) => {
    try {
        const list = await UsersCountry.findAll({ raw: true, attributes: ['country'] });

        const itemsArray = list.map(item => item.country);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getState = async (ctx: Context) => {
    try {
        const list = await UsersState.findAll({ raw: true, attributes: ['state'] });

        const itemsArray = list.map(item => item.state);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getHeight = async (ctx: Context) => {
    try {
        const list = await UsersHeight.findAll({ raw: true, attributes: ['height'] });

        const itemsArray = list.map(item => item.height);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};


export const getWeight = async (ctx: Context) => {
    try {
        const list = await UsersWeight.findAll({ raw: true, attributes: ['weight'] });

        const itemsArray = list.map(user => user.weight);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getExtraSkills = async (ctx: Context) => {
    try {
        const list = await UsersExtraSkills.findAll({ raw: true, attributes: ['skill'] });

        const itemsArray = list.map(user => user.skill);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getOccupation = async (ctx: Context) => {
    try {
        const list = await UsersOccupation.findAll({ raw: true, attributes: ['occupation'] });

        const itemsArray = list.map(user => user.occupation);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};

export const getRaasi = async (ctx: Context) => {
    try {
        const list = await UsersRaasi.findAll({ raw: true, attributes: ['raasi'] });

        const itemsArray = list.map((item: any) => item.raasi);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};
export const getStar = async (ctx: Context) => {
    try {
        const list = await UsersStar.findAll({ raw: true, attributes: ['star'] });

        const itemsArray = list.map((item: any) => item.star);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};
export const getRaasiStar = async (ctx: Context) => {
    try {
        const list: any = await UsersRaasiStar.findAll({ raw: true, attributes: ['raasiStar'] });

        const itemsArray = list.map((item: any) => item.raasiStar);

        ctx.body = { status: 1, message: 'Success', data: itemsArray };
    } catch (error: any) {
        // Handle any errors that occur during the process
        ctx.status = 400;
        ctx.body = error.message;
    }
};


export const deleteUser = async (ctx: Context) => {
    const { matriId } = ctx.query as any;
    try {
        await User.destroy({ where: { matriId: matriId } }).catch((error: any) => {
            ctx.body = { status: 3, message: 'delete failed...', data: [] };
            return;
        });

        await UserImages.destroy({ where: { matriId: matriId } }).catch((error: any) => {
            ctx.body = { status: 3, message: 'delete failed...', data: [] };
            return;
        });

        await UserProfessionalDetails.destroy({ where: { matriId: matriId } }).catch((error: any) => {
            ctx.body = { status: 3, message: 'delete failed...', data: [] };
            return;
        });

        await PartnerPrefrence.destroy({ where: { matriId: matriId } }).catch((error: any) => {
            ctx.body = { status: 3, message: 'delete failed...', data: [] };
            return;
        });
        await ReligionDetails.destroy({ where: { matriId: matriId } }).catch((error: any) => {
            ctx.body = { status: 3, message: 'delete failed...', data: [] };
            return;
        });

        await FamilyDetails.destroy({ where: { matriId: matriId } }).catch((error: any) => {
            ctx.body = { status: 3, message: 'delete failed...', data: [] };
            return;
        });
        await FamilyPropertyDetails.destroy({ where: { matriId: matriId } }).catch((error: any) => {
            ctx.body = { status: 3, message: 'delete failed...', data: [] };
            return;
        });

        await LocationDetails.destroy({ where: { matriId: matriId } }).catch((error: any) => {
            ctx.body = { status: 3, message: 'delete failed...', data: [] };
            return;
        });

        // Send success response
        ctx.body = { status: 1, message: 'Success', data: [] };
    } catch (error: any) {
        // Send error response
        ctx.status = 400;
        ctx.body = { status: 0, message: error.message };
    }
};


export const updateShortList = async (ctx: Context) => {
    const { matriId, status } = ctx.request.body as any;
    try {
        await User.update({ shortList: status }, { where: { matriId: matriId } }).catch((error: any) => {
            ctx.body = { status: 3, message: 'delete failed...', data: [] };
            return;
        });

        // Send success response
        ctx.body = { status: 1, message: 'Success', data: [] };
    } catch (error: any) {
        // Send error response
        ctx.status = 400;
        ctx.body = { status: 0, message: error.message };
    }
};