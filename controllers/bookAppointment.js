// this function is basically booking the appointment 


const {db} = require('../models/tables')


exports.bookAppointments = async (req, res) => {
    try {
      // taking data from body 
      const { user_id, operator_id, appointment_start_time, appointment_end_time } = req.body;

    // validating
      if (!user_id || !operator_id || !appointment_start_time || !appointment_end_time) {
        return res.status(400).json({ error: 'Invalid request data' });
      }
  // here $1,$2 are placeholders 
  // booking single appointment
      
      const Appointment = await db.oneOrNone(
        `
        SELECT * FROM "Appointment"
        WHERE user_id = $1
        AND status = $2
        AND (
          (appointment_start_time <= $3 AND appointment_end_time >= $3)
          OR (appointment_start_time <= $4 AND appointment_end_time >= $4)
        )
        `,
        [user_id, 'confirmed', appointment_start_time, appointment_end_time]
      );
    
      if (Appointment) {
        return res.status(400).json({ error: 'User already has a confirmed the appointment' });
      }
  
      //inserting
      await db.none(
        'INSERT INTO "Appointment" (user_id, operator_id, appointment_start_time, appointment_end_time, status) VALUES ($1, $2, $3, $4, $5)',
        [user_id, operator_id, appointment_start_time, appointment_end_time, 'confirmed']
      );
  
      return res.status(200).json({ message: 'Appointment booked successfully' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  