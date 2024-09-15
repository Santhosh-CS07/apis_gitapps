import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the FamilyDetails model
interface FamilyDetailsAttributes {
    id: number;
    fatherEmployed: string;
    fatherOccupation: string;
    motherEmployed: string;
    motherOccupation: string;
    brothers: string;
    brothersMarried: string;
    sisters: string;
    sistersMarried: string;
    familyValues: string;
    familyType: string;
    familyStatus: string;
    originalLocation: string;
    settledLocation: string;
    matriId: string;
}

// Define attributes used when creating a new record, excluding the `id`
interface FamilyDetailsCreationAttributes extends Optional<FamilyDetailsAttributes, 'id'> { }

// Create the FamilyDetails model class
class FamilyDetails extends Model<FamilyDetailsAttributes, FamilyDetailsCreationAttributes> implements FamilyDetailsAttributes {
    public id!: number;
    public fatherEmployed!: string;
    public fatherOccupation!: string;
    public motherEmployed!: string;
    public motherOccupation!: string;
    public brothers!: string;
    public brothersMarried!: string;
    public sisters!: string;
    public sistersMarried!: string;
    public familyValues!: string;
    public familyType!: string;
    public familyStatus!: string;
    public originalLocation!: string;
    public settledLocation!: string;
    public matriId!: string;
}

// Initialize the FamilyDetails model
FamilyDetails.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        fatherEmployed: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fatherOccupation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        motherEmployed: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        motherOccupation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        brothers: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        brothersMarried: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sisters: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sistersMarried: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        familyValues: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        familyType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        familyStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        originalLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        settledLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        matriId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'user_family_details',  // Specify the table name
        timestamps: false,                 // Set to true if you want automatic createdAt and updatedAt fields
    }
);

export default FamilyDetails;
