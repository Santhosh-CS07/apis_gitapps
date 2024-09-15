import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsersExtraSkillsAttributes {
    id: number;
    skill: string;
}

interface UserCreationAttributes extends Optional<UsersExtraSkillsAttributes, 'id'> { }

class UsersExtraSkills extends Model<UsersExtraSkillsAttributes, UserCreationAttributes> implements UsersExtraSkillsAttributes {
    public id!: number;
    public skill!: string;

}

UsersExtraSkills.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        skill: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        sequelize,
        tableName: 'extra_skills',
        timestamps: false,
    }
);

export default UsersExtraSkills;
