//function is for getting appointments which user booked


const { db } = require('../models/tables');

exports.getAppointmentsforUsers = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

  //checking for user
    const appointments = await db.any(
      `
      SELECT appointment_id, appointment_start_time, appointment_end_time, status
      FROM "Appointment"
      WHERE user_id = $1
      `,
      [userId]
    );

   //mapping for the response in frontend
    const formattedAppointments = appointments.map((appointment) => ({
      appointment_id: appointment.appointment_id,
      start_time: formatTimeTo24hr(appointment.appointment_start_time),
      end_time: formatTimeTo24hr(appointment.appointment_end_time),
      status: appointment.status,
    }));



    res.status(200).json(formattedAppointments);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal server error' });
  }
};
//date formmating

function formatTimeTo24hr(time) {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
