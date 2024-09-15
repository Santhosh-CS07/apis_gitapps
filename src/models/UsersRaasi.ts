import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersRaasiAttributes {
    id: number;
    raasi: string;
}

interface UserCreationAttributes extends Optional<UsersRaasiAttributes, 'id'> { }

class UsersRaasi extends Model<UsersRaasiAttributes, UserCreationAttributes> implements UsersRaasiAttributes {
    public id!: number;
    public raasi!: string;
}

UsersRaasi.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        raasi: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'raasi',
        timestamps: false,
    }
);

export default UsersRaasi;
