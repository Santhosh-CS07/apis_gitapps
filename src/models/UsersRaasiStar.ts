import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersRaasiStarAttributes {
    id: number;
    raasiStar: string;
}

interface UserCreationAttributes extends Optional<UsersRaasiStarAttributes, 'id'> { }

class UsersRaasiStar extends Model<UsersRaasiStarAttributes, UserCreationAttributes> implements UsersRaasiStarAttributes {
    public id!: number;
    public raasiStar!: string;
}

UsersRaasiStar.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        raasiStar: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'raasi_star',
        timestamps: false,
    }
);

export default UsersRaasiStar;
