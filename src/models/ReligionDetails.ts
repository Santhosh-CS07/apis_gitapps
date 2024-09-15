import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the ReligionDetails model
interface ReligionDetailsAttributes {
    id: number;
    caste: string;
    matriId: string;
    subCaste: string;
    gotram: string;
    raasi: string;
    star: string;
    raasiStar: string;
    religion: string;
    languagesKnown: string;
    motherTongue: string;
}

// Define attributes used when creating a new record, excluding the `id`
interface ReligionDetailsCreationAttributes extends Optional<ReligionDetailsAttributes, 'id'> { }

// Create the ReligionDetails model class
class ReligionDetails extends Model<ReligionDetailsAttributes, ReligionDetailsCreationAttributes> implements ReligionDetailsAttributes {
    public id!: number;
    public caste!: string;
    public matriId!: string;
    public subCaste!: string;
    public gotram!: string;
    public raasi!: string;
    public star!: string;
    public raasiStar!: string;
    public religion!: string;
    public languagesKnown!: string;
    public motherTongue!: string;
}

// Initialize the ReligionDetails model
ReligionDetails.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        caste: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        matriId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subCaste: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gotram: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        raasi: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        star: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        raasiStar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        religion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        languagesKnown: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        motherTongue: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'user_religion_details',  // Specify the table name
        timestamps: false,                   // Set to true if you want automatic createdAt and updatedAt fields
    }
);

export default ReligionDetails;
