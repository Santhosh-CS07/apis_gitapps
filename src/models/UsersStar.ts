import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersStarAttributes {
    id: number;
    star: string;
}

interface UserCreationAttributes extends Optional<UsersStarAttributes, 'id'> { }

class UsersStar extends Model<UsersStarAttributes, UserCreationAttributes> implements UsersStarAttributes {
    public id!: number;
    public star!: string;
}

UsersStar.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        star: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'star',
        timestamps: false,
    }
);

export default UsersStar;
