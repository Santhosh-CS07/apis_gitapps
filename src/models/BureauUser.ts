import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BureauUserAttributes {
    id: number;
    email: string;
    password: string;
    ownerName: string;
    bureauName: string;
    mobileNumber: string;
    location: string;
    about: string;
    bureauId: string;
    distributorId: string;
    createdAt?: Date;
    paymentStatus: number;
    deleteStatus: number;
    expiryDate: string;

}

interface BureauUserCreationAttributes extends Optional<BureauUserAttributes, 'id'> { }

class BureauUser extends Model<BureauUserAttributes, BureauUserCreationAttributes> implements BureauUserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public ownerName!: string;
    public bureauName!: string;
    public mobileNumber!: string;
    public location!: string;
    public about!: string;
    public bureauId!: string;
    public distributorId!: string;
    public createdAt?: Date;
    public paymentStatus!: number;
    public deleteStatus!: number;
    public expiryDate!: string;
}

BureauUser.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ownerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bureauName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        bureauId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        distributorId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        paymentStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deleteStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiryDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'bureau_profiles',
        timestamps: false,
    }
);

export default BureauUser;
