import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the PartnerPreference model
interface PartnerPreferenceAttributes {
    id: number;
    matriId: string;
    servicePreference: string;
    createdByPreference: string;
    religionPreference: string;
    castePreference: string;
    subCastePreference: string;
    maritalStatusPreference: string;
    childrenPreference: string;
    motherTonguePreference: string;
    ageFrom: string;
    ageTo: string;
    heightFrom: string;
    heightTo: string;
    educationPreference: string;
    employeePreference: string;
    jobLocationPreference: string;
    annualIncomePreference: string;
    familyPreference: string;
    settledLocationPreference: string;
    ownHousePreference: string;
    sftPreference: string;
    monthlyRentsPreference: string;
    openPlotsLandsPreference: string;
    apartmentFlatsPreference: string;
    propertyLocationPreference: string;
    agricultureLandPreference: string;
    totalPropertyValuePreference: string;
    countryPreference: string;
    statePreference: string;
    cityPreference: string;
    citizenshipPreference: string;
}

// Define attributes used when creating a new record, excluding the `id`
interface PartnerPreferenceCreationAttributes extends Optional<PartnerPreferenceAttributes, 'id'> { }

// Create the PartnerPreference model class
class PartnerPreference extends Model<PartnerPreferenceAttributes, PartnerPreferenceCreationAttributes> implements PartnerPreferenceAttributes {
    public id!: number;   
    public matriId!: string;
    public servicePreference!: string;
    public createdByPreference!: string;
    public religionPreference!: string;
    public castePreference!: string;
    public subCastePreference!: string;
    public maritalStatusPreference!: string;
    public childrenPreference!: string;
    public motherTonguePreference!: string;
    public ageFrom!: string;
    public ageTo!: string;
    public heightFrom!: string;
    public heightTo!: string;
    public educationPreference!: string;
    public employeePreference!: string;
    public jobLocationPreference!: string;
    public annualIncomePreference!: string;
    public familyPreference!: string;
    public settledLocationPreference!: string;
    public ownHousePreference!: string;
    public sftPreference!: string;
    public monthlyRentsPreference!: string;
    public openPlotsLandsPreference!: string;
    public apartmentFlatsPreference!: string;
    public propertyLocationPreference!: string;
    public agricultureLandPreference!: string;
    public totalPropertyValuePreference!: string;
    public countryPreference!: string;
    public statePreference!: string;
    public cityPreference!: string;
    public citizenshipPreference!: string;
}

PartnerPreference.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        matriId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        servicePreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdByPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        religionPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        castePreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subCastePreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        maritalStatusPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        childrenPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        motherTonguePreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ageFrom: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ageTo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        heightFrom: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        heightTo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        educationPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        employeePreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        jobLocationPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        annualIncomePreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        familyPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        settledLocationPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ownHousePreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sftPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        monthlyRentsPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        openPlotsLandsPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        apartmentFlatsPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        propertyLocationPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        agricultureLandPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        totalPropertyValuePreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        countryPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        statePreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cityPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        citizenshipPreference: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'user_partner_preferences',  
        timestamps: false,                 
    }
);

export default PartnerPreference;
