import Router from 'koa-router';
import {
    createUser, getAge,
    getSubCaste, getCaste, getEducation,
    getAnnualIncome, getCity, getCountry,
    getState, getHeight, getWeight, getExtraSkills, getOccupation, getRaasiStar, getStar, getRaasi,
    getFeMaleProfiles, getMaleProfiles, getShortListProfiles, getMyProfiles, getProfileData,
     getSearchData, getUserDataById, createImages, deleteUser, updateShortList
} from '../controllers/userController';

const router = new Router();

// post methods
router.post('/user/createUser', createUser);
router.post('/user/createImages', createImages);
router.post('/user/getSearchData', getSearchData);

// get methods
router.get('/user/getMaleProfiles', getMaleProfiles);
router.get('/user/getFeMaleProfiles', getFeMaleProfiles);
router.get('/user/getMyProfiles', getMyProfiles);
router.get('/user/geShortListProfiles', getShortListProfiles);
router.get('/user/getAge', getAge);
router.get('/user/getCaste', getCaste);
router.get('/user/getSubCaste', getSubCaste);
router.get('/user/getEducation', getEducation);
router.get('/user/getAnnualIncome', getAnnualIncome);
router.get('/user/getCity', getCity);
router.get('/user/getCountries', getCountry);
router.get('/user/getstates', getState);
router.get('/user/getHeight', getHeight);
router.get('/user/getWeight', getWeight);
router.get('/user/getExtraSkills', getExtraSkills);
router.get('/user/getOccupation', getOccupation);
router.get('/user/getRaasi', getRaasi);
router.get('/user/getStar', getStar);
router.get('/user/getRaasiStar', getRaasiStar);
router.get('/user/getProfileData', getProfileData);
router.get('/user/getUserDataById', getUserDataById);


router.put('/user/updateShortList', updateShortList);

// delete methods
router.delete('/user/deleteUser', deleteUser);

export default router;
