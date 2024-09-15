import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersHeightAttributes {
    id: number;
    height: string;
}

interface UserCreationAttributes extends Optional<UsersHeightAttributes, 'id'> { }

class UsersHeight extends Model<UsersHeightAttributes, UserCreationAttributes> implements UsersHeightAttributes {
    public id!: number;
    public height!: string;

}

UsersHeight.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        sequelize,
        tableName: 'height',
        timestamps: false,
    }
);

export default UsersHeight;
