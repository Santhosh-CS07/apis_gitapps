import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersCasteAttributes {
    id: number;
    caste: string;
}

interface UserCreationAttributes extends Optional<UsersCasteAttributes, 'id'> { }

class UsersCaste extends Model<UsersCasteAttributes, UserCreationAttributes> implements UsersCasteAttributes {
    public id!: number;
    public caste!: string;
}

UsersCaste.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        caste: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'caste',
        timestamps: false,
    }
);

export default UsersCaste;
