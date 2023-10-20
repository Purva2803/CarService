//getting appoinments for perticular operators


const { db } = require('../models/tables');

exports.getAppointments = async (req, res) => {
    try {
        //getting id from params
      const operatorId = req.params.id;
    //checking because frontend validation is not enough
      if (!operatorId || isNaN(operatorId)) {
        return res.status(400).json({ error: 'Invalid operator ID' });
      }
  
      // Retrieve the appointments for the operator
      const appointments = await db.any(
        `
        SELECT appointment_id, appointment_start_time, appointment_end_time, status
        FROM "Appointment"
        WHERE operator_id = $1
        `,
        [operatorId]
      );
  
      // Format the appointment times in 24-hour format 
      const { bookedSlots, freeSlots } = formatAppointments(appointments);
  
      res.status(200).json({ bookedSlots, freeSlots });
    } catch (error) {
      
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  //this are helper functions 
  
  function formatTimeTo24hr(time) {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
  
  function formatAppointments(appointments) {
    const fullDaySlots = generateFullDaySlots();
    const bookedSlots = [];
  //retriving whole object of booked slot for operator
    for (const appointment of appointments) {
      const start = formatTimeTo24hr(appointment.appointment_start_time);
      const end = formatTimeTo24hr(appointment.appointment_end_time);
      bookedSlots.push({
        appointment_id: appointment.appointment_id,
        start_time: start,
        end_time: end,
        status: appointment.status,
      });
    }
  // filtering
   
    const freeSlots = fullDaySlots.filter((slot) => {
      return !bookedSlots.some(
        (bookedSlot) =>
          slot >= `${bookedSlot.start_time}-${bookedSlot.end_time}` &&
          slot <= `${bookedSlot.start_time}-${bookedSlot.end_time}`
      );
    });
  
    return { bookedSlots, freeSlots }; 
  }
  // for time slots 0-24 hours
  function generateFullDaySlots() {
    const fullDaySlots = [];
    let currentSlot = "00:00";
  
    for (let i = 0; i <=24; i++) {
      const nextSlot = formatTimeTo24hr(new Date().setHours(i, 0, 0, 0));
      fullDaySlots.push(`${currentSlot}-${nextSlot}`);
      currentSlot = nextSlot;
    }
  
    return fullDaySlots;
  }
  