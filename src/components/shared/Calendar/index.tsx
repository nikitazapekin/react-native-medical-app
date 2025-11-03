import React, { useEffect, useMemo, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import { PRIMARY } from "@/constants/colors";

import { styles } from "./styled";

type CalendarProps = {
  initialDate?: Date;
  selectedDate?: Date | null;
  onSelectDate?: (date: Date) => void;
  primaryColor?: string;
};

const Calendar: React.FC<CalendarProps> = ({ initialDate = new Date(), selectedDate, onSelectDate, primaryColor = PRIMARY }) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(selectedDate ?? null);

  useEffect(() => {
    if (selectedDate !== undefined) {
      setInternalSelectedDate(selectedDate);
    }
  }, [selectedDate]);

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

  const isSameDay = (a: Date | null, b: Date | null): boolean => {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  const selectedDayScale = useMemo(() => new Animated.Value(0), []);

  const animateSelect = () => {
    selectedDayScale.setValue(0);
    Animated.timing(selectedDayScale, {
      toValue: 1,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleSelectDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setInternalSelectedDate(date);
    onSelectDate?.(date);
    animateSelect();
  };

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
        {days.map((day, index) => {
          const date = day
            ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            : null;
          const selected = isSameDay(date, internalSelectedDate);
          const scale = selected ? selectedDayScale.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) : 1;
          return (
            <TouchableOpacity
              key={index}
              style={styles.dayCell}
              disabled={!day}
              onPress={() => day && handleSelectDay(day)}
              activeOpacity={0.8}
            >
              {day ? (
                <Animated.View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: selected ? primaryColor : "transparent",
                    transform: [{ scale }],
                  }}
                >
                  <Text style={[styles.day, { color: selected ? "#fff" : styles.day.color }]}>{day}</Text>
                </Animated.View>
              ) : (
                <View style={{ width: 32, height: 32 }} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Calendar;

