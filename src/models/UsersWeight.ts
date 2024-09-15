import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersWeightAttributes {
    id: number;
    weight: string;
}

interface UserCreationAttributes extends Optional<UsersWeightAttributes, 'id'> { }

class UsersWeight extends Model<UsersWeightAttributes, UserCreationAttributes> implements UsersWeightAttributes {
    public id!: number;
    public weight!: string;
}

UsersWeight.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'weight',
        timestamps: false,
    }
);

export default UsersWeight;
