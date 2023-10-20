const express = require('express');
const { bookAppointments } = require('../controllers/bookAppointment');
const { cancelAppointment } = require('../controllers/cancelAppointment'); 
const { rescheduleAppointment } = require('../controllers/rescheduleAppointment');
const { getAppointments } = require('../controllers/getAppointments');
const { getOperators } = require('../controllers/getOperator'); 
const { getAppointmentsforUsers } = require('../controllers/getAppointmentsforUsers');
const router = express.Router();


router.post('/bookAppointment', bookAppointments); 
router.delete('/cancelAppointment', cancelAppointment);
router.put('/rescheduleAppointment', rescheduleAppointment);
router.get('/getAppointments/:id', getAppointments);
router.get('/getUserAppointments/:id',getAppointmentsforUsers)
router.get('/operators', getOperators);


module.exports = router;
