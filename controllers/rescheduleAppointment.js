//updating the time

const { db } = require('../models/tables')


exports.rescheduleAppointment = async (req, res) => {
    try {
        const { appointment_id, new_start_time, new_end_time } = req.body;

        if (!appointment_id || !new_start_time || !new_end_time) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        const existingAppointment = await db.oneOrNone('SELECT * FROM "Appointment" WHERE appointment_id = $1 AND status = $2', [appointment_id, 'confirmed']);

        if (!existingAppointment) {
            return res.status(404).json({ error: 'Appointment not found or not confirmed' });
        }

        
        const newStartTime = new Date(new_start_time);
        const newEndTime = new Date(new_end_time);

       
        await db.none('UPDATE "Appointment" SET appointment_start_time = $1, appointment_end_time = $2 WHERE appointment_id = $3',
            [newStartTime, newEndTime, appointment_id]);

        return res.status(200).json({ message: 'Appointment rescheduled successfully' });
    } catch (error) {
       
        return res.status(500).json({ error: 'Internal server error' });
    }
};
