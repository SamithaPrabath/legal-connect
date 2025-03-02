import { getScheduleByDate } from "@actions/scheduleAction";
import { border } from "@assets/style/boxStyles";
import ParentCard from "@components/ParentCard";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { timeSlots } from "@type/Event";
import LocalStorageHandler from "@utils/localStorageHandler";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Calendar from "./Calender";
import { isBackendConnected } from "@utils/env-config";
import { tempGetScheduleByDate } from "@temporaryActions/tempScheduleActions";

const ScheduleCard = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const profileId = new LocalStorageHandler().profileId;

  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const dispatch = useAppDispatch();
  const { data: schdules } = useAppSelector((state) => state.event.byDate);

  const onDateSelected = (day: Dayjs) => {
    setSelectedDate(day);
  };

  useEffect(() => {
    if (!selectedDate || !profileId) return;
    const date = selectedDate.toISOString().substring(0, 10);
    if (isBackendConnected) dispatch(getScheduleByDate(profileId, date));
    else dispatch(tempGetScheduleByDate(date));
  }, [profileId, selectedDate]);

  return (
    <ParentCard
      title="Schedule"
      display="flex"
      gap="20px"
      parentBoxProps={{ mt: "30px" }}
    >
      <Grid width="80%" container>
        {timeSlots.map((timeslot) => {
          const schedule = schdules?.find((s) => s.time === timeslot);
          return (
            <Grid item xs={4} p="20px">
              <TimeCard
                time={timeslot}
                isActive={!!schedule}
                eventTitle={schedule?.title}
                subtitle={schedule?.description}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box
        my="20px"
        height="100%"
        {...border}
        sx={{ p: 2, height: "100%", overflowY: "auto" }}
        width="20%"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={handlePrevMonth}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography variant="body1" fontWeight="bold">
            {currentMonth.format("MMMM YYYY")}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>
        <Calendar selectedMonth={currentMonth} onDateSelect={onDateSelected} />
      </Box>
    </ParentCard>
  );
};

type TimeCardProps = {
  time: string;
  isActive?: boolean;
  eventTitle?: string;
  subtitle?: string;
};

const TimeCard = ({ time, isActive, eventTitle, subtitle }: TimeCardProps) => {
  return (
    <Box
      width="100%"
      {...border}
      p="10px"
      height="150px"
      bgcolor={isActive ? useTheme().palette.primary.light : "white"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Typography variant="h5">{time}</Typography>
      <Box>
        <Typography variant="h4">{eventTitle}</Typography>
        <Typography variant="body2">{subtitle}</Typography>
      </Box>
    </Box>
  );
};

export default ScheduleCard;
