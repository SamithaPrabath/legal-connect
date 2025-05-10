import { border } from "@assets/style/boxStyles";
import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";

interface CalendarProps {
  selectedMonth: dayjs.Dayjs;
  onDateSelect: (date: dayjs.Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedMonth, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  
  const daysInMonth = selectedMonth.daysInMonth();

  const handleDateClick = (day: number) => {
    const date = selectedMonth.date(day);
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <Grid container spacing={1} sx={{ mt: 2, overflowY: "auto" }} maxHeight="calc(100vh - 270px)">
      {[...Array(daysInMonth)].map((_, index) => {
        const day = index + 1;
        const isSelected = selectedDate?.date() === day;

        return (
          <Grid item xs={12} key={day}>
            <Box
                {...border}
              sx={{
                py: "10px",
                px: "20px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: isSelected ? "primary.main" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleDateClick(day)}
            >
              <Typography color={!isSelected ? "text.primary" : "background.paper"}>{day}</Typography>
              <Typography color="success.main">●</Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Calendar;