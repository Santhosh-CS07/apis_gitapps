import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersCityAttributes {
    id: number;
    city: string;
}

interface UserCreationAttributes extends Optional<UsersCityAttributes, 'id'> { }

class UsersCity extends Model<UsersCityAttributes, UserCreationAttributes> implements UsersCityAttributes {
    public id!: number;
    public city!: string;
}

UsersCity.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'city',
        timestamps: false,
    }
);

export default UsersCity;
