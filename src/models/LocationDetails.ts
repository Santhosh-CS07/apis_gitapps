import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the LocationDetails model
interface LocationDetailsAttributes {
    id: number;
    country: string;
    state: string;
    city: string;
    citizenship: string;
    matriId: string;
}

// Define attributes used when creating a new record, excluding the `id`
interface LocationDetailsCreationAttributes extends Optional<LocationDetailsAttributes, 'id'> { }

// Create the LocationDetails model class
class LocationDetails extends Model<LocationDetailsAttributes, LocationDetailsCreationAttributes> implements LocationDetailsAttributes {
    public id!: number;
    public country!: string;
    public state!: string;
    public city!: string;
    public citizenship!: string;
    public matriId!: string;
}

// Initialize the LocationDetails model
LocationDetails.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        citizenship: {
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
        tableName: 'user_location_details',  
        timestamps: false,                 
    }
);

export default LocationDetails;
