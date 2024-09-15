import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the UserProfessionalDetails model
interface UserProfessionalDetailsAttributes {
    id: number;
    education: string;
    employedStatus: string;
    occupation: string;
    annualIncome: string;
    jobLocation: string;
    business: string;
    businessLocations: string;
    businessIncome: string;
    skills: string; 
    matriId: string; 
}

// Define attributes used when creating a new record, excluding the `id`
interface UserProfessionalDetailsCreationAttributes extends Optional<UserProfessionalDetailsAttributes, 'id'> { }

// Create the UserProfessionalDetails model class
class UserProfessionalDetails extends Model<UserProfessionalDetailsAttributes, UserProfessionalDetailsCreationAttributes> implements UserProfessionalDetailsAttributes {
    public id!: number;
    public education!: string;
    public employedStatus!: string;
    public occupation!: string;
    public annualIncome!: string;
    public jobLocation!: string;
    public business!: string;
    public businessLocations!: string;
    public businessIncome!: string;
    public skills!: string;
    public matriId!: string;
}

// Initialize the UserProfessionalDetails model
UserProfessionalDetails.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        education: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        employedStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        annualIncome: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jobLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        business: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        businessLocations: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        businessIncome: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        skills: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        matriId: {
            type: DataTypes.STRING, 
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'user_professional_details', // Ensure this matches your actual table name
        timestamps: false, // Set to true if you want automatic createdAt and updatedAt fields
    }
);

export default UserProfessionalDetails;
