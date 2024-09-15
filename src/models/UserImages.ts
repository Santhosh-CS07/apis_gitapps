import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the UserImages model
interface UserImagesAttributes {
    id: number;
    image: string;         // Assuming the image field is a Base64 string
    matriId: string;       // Assuming matriId is a string
    position: number;
    deleteStatus: number;
}

// Define attributes used when creating a new record, excluding the `id`
interface UserImagesCreationAttributes extends Optional<UserImagesAttributes, 'id'> { }

// Create the UserImages model class
class UserImages extends Model<UserImagesAttributes, UserImagesCreationAttributes> implements UserImagesAttributes {
    public id!: number;
    public image!: string;
    public matriId!: string;
    public position!: number;
    public deleteStatus!: number;
}

// Initialize the UserImages model
UserImages.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: DataTypes.TEXT,   // Use TEXT to accommodate potentially large Base64 strings
            allowNull: true,
        },
        matriId: {
            type: DataTypes.STRING, // Adjust type based on matriId format
            allowNull: true,
        },
        position: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        deleteStatus: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,       // Assuming default value for deleteStatus is 1
        }
    },
    {
        sequelize,
        tableName: 'user_images',
        timestamps: false, // Set to true if you want automatic createdAt and updatedAt fields
    }
);

export default UserImages;
