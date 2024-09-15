import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the LocationDetails model
interface PartnerPrefrenceAttributes {
    id: number;
    matriId: string;
    type: string;
    values: string;
}

// Define attributes used when creating a new record, excluding the `id`
interface PartnerPrefrenceCreationAttributes extends Optional<PartnerPrefrenceAttributes, 'id'> { }

// Create the LocationDetails model class
class PartnerPrefrence extends Model<PartnerPrefrenceAttributes, PartnerPrefrenceCreationAttributes> implements PartnerPrefrenceAttributes {
    public id!: number;   
    public type!: string;
    public matriId!: string;
    public values!: string;
}

PartnerPrefrence.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        matriId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        values: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'user_partner_preferences',  
        timestamps: false,                 
    }
);

export default PartnerPrefrence;
