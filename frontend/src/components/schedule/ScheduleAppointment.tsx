import { eventCreateAction, getAvailableTimeSlots } from "@actions/eventAction";
import { border } from "@assets/style/boxStyles";
import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import ParentCard from "@components/ParentCard";
import { Box, Grid, lighten, Typography, useTheme } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { tempGetAvailableTimeSlots } from "@temporaryActions/tempEventActions";
import { EventRequest, timeSlots } from "@type/Event";
import { UserType } from "@type/User";
import { schedule_route } from "@utils/context-paths";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ScheduleAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const lawyerId = params.lawyerId;

  const localStoragehandler = new LocalStorageHandler();

  const { data: filteredTimeSlots } = useAppSelector(state => state.event.timeslots);

  const clientId = localStoragehandler.profileId;
  const userType = localStoragehandler.userType;

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    if (!clientId || !lawyerId) return;
    const event: EventRequest = {
        description,
        date: selectedDate.toISOString().substring(0,10),
        time: selectedTime,
        title: "Appointment",
        clientId,
        lawyerId
    }

    dispatch(eventCreateAction(event));
    navigate(schedule_route)
  }

  useEffect(() => {
    if (isBackendConnected) {
        if (!lawyerId || !selectedDate) return;
        const date = selectedDate?.toISOString().substring(0,10);
        dispatch(getAvailableTimeSlots(lawyerId, date))
    }
    else dispatch(tempGetAvailableTimeSlots());

  },[selectedDate, lawyerId])

  if (userType !== UserType.CLIENT) return null;

  return (
    <Box p="30px">
      <ParentCard title="Schedule Appointment" display="flex" gap="30px">
        <Box {...border}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>
        </Box>
        <Box width="100%">
          <Grid item xs={12} md={7} mb="20px">
            <Grid container spacing={1}>
              {timeSlots.map((time) => (
                <Grid item xs={4} key={time}>
                  <Box
                    {...(filteredTimeSlots?.includes(time) && border)}
                    textAlign="center"
                    p="10px"
                    bgcolor={selectedTime === time ? useTheme().palette.primary.main : filteredTimeSlots?.includes(time) ? "white" : lighten(useTheme().palette.text.secondary, 0.9)}
                    onClick={() =>  {
                        if (filteredTimeSlots?.includes(time)) setSelectedTime(time)
                    }}
                    sx={{cursor: filteredTimeSlots?.includes(time) ? "pointer" : "auto"}}
                  >
                    <Typography
                      variant="h4"
                      fontWeight={400}
                      sx={{ color: selectedTime === time ? "white" : filteredTimeSlots?.includes(time) ? "black" : "lightgray" }}
                    >
                      {time}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Box>
            <FormField
              label="Message"
              name="description"
              handleChange={(_, value) => {
                setDescription(value as string);
              }}
              multiline
              rows={3}
              fullWidth
              value={description}
            />
            <MUIButton onClick={handleSubmit}>Schedule Appointment</MUIButton>
          </Box>
        </Box>
      </ParentCard>
    </Box>
  );
};

export default ScheduleAppointment;
