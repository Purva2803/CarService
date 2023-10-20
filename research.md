# Research and Approach i have followed(thought process)

## thought process -->
- firstly i have assumed that i am an user and i have logged in to a website.
- after login i can see 3 cards which contains diffrent operators here we have 3 (`api/operators` endpoint)
- then after clicking on it can see operator's details
- then user can see different slots in scroll bar from [`0-24`] hours
- after choosing the time from from the body {user_id,operator_id,appointment_start_time, appointment_end_time} passed and an appointment is created with status "confirmed" (`api/bookAppointment` endpoint ) also an appointment_id is generated and stored
- after creating the apointment user will click on cancel button and it will pass the appointment_id and the api will change appointment's status to "canceled" (`api/cancelAppointment` endpoint)
- for rescheduling user will click the button where we pass the appointment_id and new start and end time
- here for retriving for the appointments for the user we will pass user_id (`api/getUserAppointments/:id` endpoint)
- here for retriving slots for operator we pass operator's id operator_id(`api/getAppointments/:id` endpoint)
- in real what we can do is make only one log in and set status for user like if status:1 then it's user if status:2 then it is operator

## research and refrence-->


- an interface to integrating Node js with postgres `https://www.npmjs.com/package/pg-promise`
- for preventing table to be created everytime the server starts i have read about IF NOT EXIST `https://stackoverflow.com/questions/1175217/sql-server-if-not-exists-usage`
