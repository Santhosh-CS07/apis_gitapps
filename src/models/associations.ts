// models/associations.ts
import DistributorUser from './DistributorUser';
import DistributorDocuments from './DistributorDocuments';
import User from './User';
import UserProfessionalDetails from './UserProfessionalDeatils';
import LocationDetails from './LocationDetails';
import ReligionDetails from './ReligionDetails';
import UserImages from './UserImages';
import FamilyDetails from './FamilyDetails';
import FamilyPropertyDetails from './FamilyPropertyDetails';
import PartnerPrefrence from './PartnerPrefrence';
import BureauUser from './BureauUser';
import PartnerPreference from './PartnerPrefrence';
import BureauDocuments from './BureauDocuments';

// Define associations
export const setupAssociations = () => {
        DistributorUser.hasMany(DistributorDocuments, {  foreignKey: 'distributorId',
        sourceKey: 'distributorId', as: 'documents' });
        User.hasOne(UserProfessionalDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'professionalDetails' });
        User.hasOne(LocationDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'locationDetails' });
        User.hasOne(ReligionDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'religionDeails' });
        User.hasMany(UserImages, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'images' });
        User.hasOne(FamilyDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'familyDetails' });
        User.hasOne(FamilyPropertyDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'familyPropertyDetails' });
        User.hasOne(PartnerPreference, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'partnerDetails' });
        User.hasOne(BureauUser, {  foreignKey: 'bureauId',
        sourceKey: 'bureauId', as: 'bureau' });
        BureauUser.hasMany(BureauDocuments, {  foreignKey: 'bureauId',
        sourceKey: 'bureauId', as: 'bureauImages' });
};
