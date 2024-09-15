import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersOccupationAttributes {
    id: number;
    occupation: string;
}

interface UserCreationAttributes extends Optional<UsersOccupationAttributes, 'id'> { }

class UsersOccupation extends Model<UsersOccupationAttributes, UserCreationAttributes> implements UsersOccupationAttributes {
    public id!: number;
    public occupation!: string;

}

UsersOccupation.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        sequelize,
        tableName: 'occupations',
        timestamps: false,
    }
);

export default UsersOccupation;
