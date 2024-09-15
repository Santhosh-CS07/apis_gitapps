import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersStateAttributes {
    id: number;
    state: string;
}

interface UserCreationAttributes extends Optional<UsersStateAttributes, 'id'> { }

class UsersState extends Model<UsersStateAttributes, UserCreationAttributes> implements UsersStateAttributes {
    public id!: number;
    public state!: string;
}

UsersState.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'state',
        timestamps: false,
    }
);

export default UsersState;
