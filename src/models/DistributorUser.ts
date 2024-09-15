import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes interface for the DistributorUser model
interface DistributorUserAttributes {
    id: number;
    fullName?: string;
    companyName?: string;
    email?: string;
    password?: string;
    mobileNumber?: string;
    location?: string;
    createdAt?: Date;
    distributorId: string;
    paymentStatus: number;
    deleteStatus: number;
}

// Define the optional attributes for creation
interface UserCreationAttributes extends Optional<DistributorUserAttributes, 'id' | 'createdAt'> { }

// Define the DistributorUser model class
class DistributorUser extends Model<DistributorUserAttributes, UserCreationAttributes> implements DistributorUserAttributes {
    public id!: number;
    public fullName?: string;
    public companyName?: string;
    public email?: string;
    public password?: string;
    public mobileNumber?: string;
    public location?: string;
    public createdAt?: Date;
    public distributorId!: string;
    public paymentStatus!: number;
    public deleteStatus!: number;

    // Optional: Define any methods or virtual fields here if needed
}

// Initialize the DistributorUser model
DistributorUser.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        distributorId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deleteStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        tableName: 'distributor_profiles', // Ensure this matches your actual table name
        timestamps: false, // Assuming you are not using Sequelize's default timestamp fields
    }
);

export default DistributorUser;
