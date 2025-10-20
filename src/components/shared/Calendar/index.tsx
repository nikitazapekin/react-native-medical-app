import React, { useState } from "react";
import { Text, TouchableOpacity,View } from "react-native";

import { styles } from "./styled";

type CalendarProps = {
  initialDate?: Date;
};

const Calendar: React.FC<CalendarProps> = ({ initialDate = new Date(2020, 9, 1) }) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  const months: string[] = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const weekDays: string[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const changeMonth = (direction: number): void => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);

      newDate.setMonth(prevDate.getMonth() + direction);

      return newDate;
    });
  };

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const firstDay: Date = new Date(year, month, 1);
    const lastDay: Date = new Date(year, month + 1, 0);

    const daysInMonth: number = lastDay.getDate();
    const startingDayOfWeek: number = (firstDay.getDay() + 6) % 7;

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days: (number | null)[] = getDaysInMonth(currentDate);

  return (
    <View style={styles.calendarContainer}>

      <View style={styles.header}>
        <Text style={styles.monthYear}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <View style={styles.arrows}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Text style={styles.arrow}>&lt;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Text style={styles.arrow}>&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekDays}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayCell}>
            {day && <Text style={styles.day}>{day}</Text>}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calendar;
/* import { View } from "react-native";
import { styles } from "./styled";
const Calendar = () => {
  return ( <View>

  </View> );
}

export default Calendar;
 */
