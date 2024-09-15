import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AnnualIncomeAttributes {
    id: number;
    annual_income: string;
}

interface UserCreationAttributes extends Optional<AnnualIncomeAttributes, 'id'> { }

class AnnualIncome extends Model<AnnualIncomeAttributes, UserCreationAttributes> implements AnnualIncomeAttributes {
    public id!: number;
    public annual_income!: string;
}

AnnualIncome.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        annual_income: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        sequelize,
        tableName: 'annual_income',
        timestamps: false,
    }
);

export default AnnualIncome;
