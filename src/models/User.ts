import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    matriId: string;
    gender: string;
    imagePrivacy: string;
    mobileNumber: number;
    height: string;
    weight: string;
    maritalStatus: string;
    physicalStatus: string;
    bodyType: string;
    eatingHabit: string;
    drinkingHabit: string;
    smokingHabit: string;
    deleteStatus: number;
    paymentStatus: number;
    createdBy: string;
    bureauId: string;
    dateOfBirth: string;
    birthTime: string;
    age: number;
    shortList: number;
    maleKids: string;
    femaleKids: string;
    kidsWith: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public matriId!: string;
    public gender!: string;
    public imagePrivacy!: string;
    public mobileNumber!: number;
    public height!: string;
    public weight!: string;
    public maritalStatus!: string;
    public physicalStatus!: string;
    public bodyType!: string;
    public eatingHabit!: string;
    public drinkingHabit!: string;
    public smokingHabit!: string;
    public deleteStatus!: number;
    public paymentStatus!: number;
    public createdBy!: string;
    public bureauId!: string;
    public dateOfBirth!: string;
    public birthTime!: string;
    public age!: number;
    public shortList!: number;
    public maleKids!: string;
    public femaleKids!: string;
    public kidsWith!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        matriId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imagePrivacy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mobileNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        height: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        maritalStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        physicalStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bodyType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eatingHabit: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        drinkingHabit: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        smokingHabit: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deleteStatus: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 1,
        },
        paymentStatus: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 0,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bureauId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        shortList: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        maleKids: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        femaleKids: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        kidsWith: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true, // automatically manages `createdAt` and `updatedAt` fields
    }
);

export default User;
