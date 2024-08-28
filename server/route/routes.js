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
//#endregion

//#region user routes
router.post('/register', validate(userSchema), createUser);
router.post('/login', validate(loginSchema), login);
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
//#endregion

//#region sheet
router.post('/createSheet', jwtWare, createSheet);
router.delete('/deleteSheet/:id', jwtWare, deleteSheet);
//#endregion

//#region premium user routes
router.post('/upgradeToPremium', jwtWare, createPremiumUser);
//#endregion

module.exports = router;