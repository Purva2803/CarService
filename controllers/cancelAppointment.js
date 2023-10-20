//this is for canceling the appointment

const {db} = require('../models/tables')


exports.cancelAppointment = async (req, res) => {
    try {
        //taking id from the body
        const { apointment_id } = req.body;

      
        if (!apointment_id) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        
        const existingAppointment = await db.oneOrNone('SELECT * FROM "Appointment" WHERE appointment_id = $1 AND status = $2', [apointment_id, 'confirmed']);

        if (!existingAppointment) {
            return res.status(404).json({ error: 'Apointment not found or not confirmed' });
        }

        //changing the status
        await db.none('UPDATE "Appointment" SET status = $1 WHERE appointment_id = $2', ['canceled', apointment_id]);

        return res.status(200).json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        
        return res.status(500).json({ error: 'Internal server error' });
    }
};
