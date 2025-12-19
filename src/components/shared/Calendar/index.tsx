import React, { useEffect, useMemo, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styled";

import { PRIMARY } from "@/constants/colors";

type CalendarProps = {
  initialDate?: Date;
  selectedDate?: Date | null;
  onSelectDate?: (date: Date) => void;
  primaryColor?: string;
};

const Calendar: React.FC<CalendarProps> = ({
  initialDate = new Date(),
  selectedDate = null,
  onSelectDate,
  primaryColor = PRIMARY
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(selectedDate);
 
  useEffect(() => {
    setInternalSelectedDate(selectedDate);
  }, [selectedDate]);
 
  useEffect(() => {
    if (selectedDate && (
      selectedDate.getMonth() !== currentDate.getMonth() ||
      selectedDate.getFullYear() !== currentDate.getFullYear()
    )) {
      setCurrentDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
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

    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
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

  const isToday = (day: number): boolean => {
    const today = new Date();
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  };
 
  const isSelectedDay = (day: number): boolean => {
    if (!internalSelectedDate) return false;

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    return isSameDay(date, internalSelectedDate);
  };

  return (
    <View style={styles.calendarContainer}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => changeMonth(-1)}

        >
          <Text style={[styles.arrow, { color: primaryColor }]}>&lt;</Text>
        </TouchableOpacity>

        <Text style={styles.monthYear}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>

        <TouchableOpacity
          onPress={() => changeMonth(1)}

        >
          <Text style={[styles.arrow, { color: primaryColor }]}>&gt;</Text>
        </TouchableOpacity>
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
          if (!day) {
            return (
              <View key={index} style={styles.dayCell}>
                <View style={{ width: 32, height: 32 }} />
              </View>
            );
          }

          const today = isToday(day);
          const selected = isSelectedDay(day);
          const scale = selected ? selectedDayScale.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1]
          }) : 1;

          return (
            <TouchableOpacity
              key={index}
              style={styles.dayCell}
              onPress={() => handleSelectDay(day)}
              activeOpacity={0.8}
            >
              <Animated.View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: selected ? primaryColor : "transparent",
                  borderWidth: today ? 1 : 0,
                  borderColor: today ? primaryColor : "transparent",
                  transform: [{ scale }],
                }}
              >
                <Text style={[
                  styles.day,
                  {
                    color: selected ? "#fff" : today ? primaryColor : styles.day.color,
                    fontWeight: today ? "600" : "400"
                  }
                ]}>
                  {day}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Calendar;
