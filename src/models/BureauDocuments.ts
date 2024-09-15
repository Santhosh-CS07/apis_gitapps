import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database'; // Ensure this path is correct

// Define the attributes interface for DistributorDocuments model
interface BureauDocumentsAttributes {
    id: number;
    filePath?: string;
    bureauId: string;
    deleteStatus: number;
    banner?: number; // Made optional if it's not always required
    fileName?: string; // Made optional if it's not always required
}

// Define the optional attributes for creation
interface DistributorDocumentsCreationAttributes extends Optional<BureauDocumentsAttributes, 'id'> { }

// Define the DistributorDocuments model class
class BureauDocuments extends Model<BureauDocumentsAttributes, DistributorDocumentsCreationAttributes> implements BureauDocumentsAttributes {
    public id!: number;
    public filePath?: string;
    public bureauId!: string;
    public deleteStatus!: number;
    public fileName?: string;
    public banner?: number;

    // Optional: Define any methods or virtual fields here if needed
}

// Initialize the DistributorDocuments model
BureauDocuments.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        filePath: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        bureauId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deleteStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        banner: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize, // Pass the Sequelize instance
        tableName: 'bureau_documents', // Ensure this matches your actual table name
        timestamps: false, // Assuming you are not using Sequelize's default timestamp fields
    }
);

export default BureauDocuments;
