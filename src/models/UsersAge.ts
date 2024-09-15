import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersAgeAttributes {
    id: number;
    age: number;
    flag: number;
}

interface UserCreationAttributes extends Optional<UsersAgeAttributes, 'id'> { }

class UsersAge extends Model<UsersAgeAttributes, UserCreationAttributes> implements UsersAgeAttributes {
    public id!: number;
    public age!: number;
    public flag!: number;
}

UsersAge.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        age: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        flag: {
            type: DataTypes.NUMBER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'age',
        timestamps: false,
    }
);

export default UsersAge;
