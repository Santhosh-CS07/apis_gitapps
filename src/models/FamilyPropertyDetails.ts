import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the FamilyPropertyDetails model
interface FamilyPropertyDetailsAttributes {
    id: number;
    ownHouseItems: string;
    ownHouseSqFeet: string;
    totalValue: string;
    monthlyRents: string;
    ownHouseLocations: string;
    openPlots: string;
    openPlotsSqFeet: string;
    openPlotsTotalValue: string;
    openPlotsLocations: string;
    apartment: string;
    flatsTotalValue: string;
    flatsLocation: string;
    agricultureLand: string;
    agricultureLandTotalValue: string;
    agricultureLandLocation: string;
    moreProperties: string;
    totalPropertyValue: string;
    matriId: string;
}

// Define attributes used when creating a new record, excluding the `id`
interface FamilyPropertyDetailsCreationAttributes extends Optional<FamilyPropertyDetailsAttributes, 'id'> { }

// Create the FamilyPropertyDetails model class
class FamilyPropertyDetails extends Model<FamilyPropertyDetailsAttributes, FamilyPropertyDetailsCreationAttributes> implements FamilyPropertyDetailsAttributes {
    public id!: number;
    public ownHouseItems!: string;
    public ownHouseSqFeet!: string;
    public totalValue!: string;
    public monthlyRents!: string;
    public ownHouseLocations!: string;
    public openPlots!: string;
    public openPlotsSqFeet!: string;
    public openPlotsTotalValue!: string;
    public openPlotsLocations!: string;
    public apartment!: string;
    public flatsTotalValue!: string;
    public flatsLocation!: string;
    public agricultureLand!: string;
    public agricultureLandTotalValue!: string;
    public agricultureLandLocation!: string;
    public moreProperties!: string;
    public totalPropertyValue!: string;
    public matriId!: string;

}

// Initialize the FamilyPropertyDetails model
FamilyPropertyDetails.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        ownHouseItems: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ownHouseSqFeet: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        totalValue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        monthlyRents: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ownHouseLocations: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        openPlots: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        openPlotsSqFeet: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        openPlotsTotalValue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        openPlotsLocations: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        apartment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        flatsTotalValue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        flatsLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        agricultureLand: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        agricultureLandTotalValue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        agricultureLandLocation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        moreProperties: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        totalPropertyValue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        matriId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
      
    },
    {
        sequelize,
        tableName: 'user_family_property_details',  
        timestamps: false,                 
    }
);

export default FamilyPropertyDetails;
