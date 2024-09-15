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

// Define associations
export const setupAssociations = () => {
        DistributorUser.hasMany(DistributorDocuments, {  foreignKey: 'distributorId',
        sourceKey: 'distributorId', as: 'documents' });
        User.hasMany(UserProfessionalDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'professionalDetails' });
        User.hasMany(LocationDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'locationDetails' });
        User.hasMany(ReligionDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'religionDeails' });
        User.hasMany(UserImages, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'images' });
        User.hasMany(FamilyDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'familyDetails' });
        User.hasMany(FamilyPropertyDetails, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'familyPropertyDetails' });
        User.hasMany(PartnerPrefrence, {  foreignKey: 'matriId',
        sourceKey: 'matriId', as: 'partnerDetails' });
};
