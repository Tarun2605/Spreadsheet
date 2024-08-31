const express = require('express');
const router = express.Router();

//#region imports
const { createUser } = require('../controller/user/register');
const validate = require('../middlewares/validate');
const userSchema = require('../schema/userSchema');
const loginSchema = require('../schema/loginSchema');
const { login } = require('../controller/user/login');
const createTeamSchema = require('../schema/createTeamSchema');
const { createTeam } = require('../controller/team/createTeam');
const jwtWare = require('../middlewares/jwtWare');
const { getUserTeams } = require('../controller/team/getUserTeams');
const { updateTeam } = require('../controller/team/updateTeam');
const createWorkBookSchema = require('../schema/createWorkbookSchema');
const { createWorkbook } = require('../controller/workbook/createWorkbook');
const { getUserWorkbook } = require('../controller/workbook/getUserWorkbook');
const { updateWorkbook } = require('../controller/workbook/updateWorkbook');
const { createSheet } = require('../controller/sheets/createSheet');
const createSheetSchema = require('../schema/createSheetSchema');
const { deleteSheet } = require('../controller/sheets/deleteSheet');
const { createPremiumUser } = require('../controller/premiumUser/createPremiumUser');
const { getUserDetails } = require('../controller/user/getUserDetails');
const { getUsers } = require('../controller/user/getUsers');
const { editUser } = require('../controller/user/editUser');
const { getWorkbookDetails } = require('../controller/workbook/getWorkbookDetails');
const { sendOtp } = require('../controller/forgotPassword/sendOtp');
const { getWorkbookByRoom } = require('../controller/workbook/getWorkbookByRoom');
const { verifyOtp } = require('../controller/forgotPassword/verifyOtp');
const { inviteMember } = require('../controller/workbook/inviteMember');
const { askQuery } = require('../controller/query/askQuery');
//#endregion

//#region user routes
router.post('/register', validate(userSchema), createUser);
router.post('/login', login);
router.get('/getUserDetails', jwtWare, getUserDetails);
router.get('/getUsers', jwtWare, getUsers);
router.post('/editUser', jwtWare, editUser);
router.post('/sendOtp', jwtWare, sendOtp);
router.post('/verifyOtp', jwtWare, verifyOtp);
//#endregion

//#region team routes
router.post('/createTeam', validate(createTeamSchema), jwtWare, createTeam);
router.get('/getTeams', jwtWare, getUserTeams);
router.put('/updateTeam', jwtWare, updateTeam);
//#endregion

//#region workbook routes
router.post('/createWorkbook', validate(createWorkBookSchema), jwtWare, createWorkbook);
router.get('/getUserWorkbook', jwtWare, getUserWorkbook);
router.put('/updateWorkbook/:id', validate(createSheetSchema), jwtWare, updateWorkbook);
router.get('/getWorkbook/:workbookId', jwtWare, getWorkbookDetails);
router.get('/getWorkbookByRoom/:roomId', jwtWare, getWorkbookByRoom);
router.post("/invite", jwtWare, inviteMember);
//#endregion

//#region sheet
router.post('/createSheet', jwtWare, createSheet);
router.delete('/deleteSheet/:id', jwtWare, deleteSheet);
//#endregion

//#region premium user routes
router.post('/upgradeToPremium', jwtWare, createPremiumUser);
//#endregion

//#region askQuery
router.post('/askQuery', jwtWare, askQuery);
//#endregion

module.exports = router;