import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersSubCasteAttributes {
    id: number;
    sub_caste: string;
}

interface UserCreationAttributes extends Optional<UsersSubCasteAttributes, 'id'> { }

class UsersSubCaste extends Model<UsersSubCasteAttributes, UserCreationAttributes> implements UsersSubCasteAttributes {
    public id!: number;
    public sub_caste!: string;
}

UsersSubCaste.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        sub_caste: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'sub_caste',
        timestamps: false,
    }
);

export default UsersSubCaste;
