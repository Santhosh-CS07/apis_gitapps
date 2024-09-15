import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersCountryAttributes {
    id: number;
    country: string;
}

interface UserCreationAttributes extends Optional<UsersCountryAttributes, 'id'> { }

class UsersCountry extends Model<UsersCountryAttributes, UserCreationAttributes> implements UsersCountryAttributes {
    public id!: number;
    public country!: string;
}

UsersCountry.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'country',
        timestamps: false,
    }
);

export default UsersCountry;
