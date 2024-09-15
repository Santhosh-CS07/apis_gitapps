import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface EducationListAttributes {
    id: number;
    education: string;
}

interface UserCreationAttributes extends Optional<EducationListAttributes, 'id'> { }

class EducationList extends Model<EducationListAttributes, UserCreationAttributes> implements EducationListAttributes {
    public id!: number;
    public education!: string;
}

EducationList.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        education: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        sequelize,
        tableName: 'education',
        timestamps: false,
    }
);

export default EducationList;
