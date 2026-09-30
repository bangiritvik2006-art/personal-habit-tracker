import { useState, useEffect } from "react";
import "./App.css";

import HabitCard from "./components/HabitCard";
import AddHabit from "./components/AddHabit";
import WeeklyStats from "./components/WeeklyStats";
import ProgressCard from "./components/ProgressCard";

function App() {

  // =========================
  // HABITS
  // =========================

  const [habits, setHabits] = useState(() => {

    const savedHabits = localStorage.getItem("habits");

    if (savedHabits) {
      return JSON.parse(savedHabits);
    }

    return [
      {
        id: 1,
        name: "Reading",
        icon: "📚",
        completed: false
      },
      {
        id: 2,
        name: "Exercise",
        icon: "🏋️",
        completed: false
      },
      {
        id: 3,
        name: "Water Intake",
        icon: "💧",
        completed: false
      },
      {
        id: 4,
        name: "Meditation",
        icon: "🧘",
        completed: false
      }
    ];

  });


  // =========================
  // NEW HABIT
  // =========================

  const [newHabit, setNewHabit] = useState("");


  // =========================
  // WATER
  // =========================

  const [waterCount, setWaterCount] = useState(() => {

    const savedWater =
      localStorage.getItem("waterCount");

    return savedWater
      ? Number(savedWater)
      : 0;

  });


  // =========================
  // COMPLETION DATES
  // =========================

  const [completionDates, setCompletionDates] =
    useState(() => {

      const savedDates =
        localStorage.getItem("completionDates");

      return savedDates
        ? JSON.parse(savedDates)
        : [];

    });


  // =========================
  // DARK MODE
  // =========================

  const [darkMode, setDarkMode] =
    useState(() => {

      const savedTheme =
        localStorage.getItem("darkMode");

      return savedTheme === "true";

    });


  // =========================
  // SAVE DATA
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "habits",
      JSON.stringify(habits)
    );

  }, [habits]);


  useEffect(() => {

    localStorage.setItem(
      "waterCount",
      waterCount.toString()
    );

  }, [waterCount]);


  useEffect(() => {

    localStorage.setItem(
      "completionDates",
      JSON.stringify(completionDates)
    );

  }, [completionDates]);


  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode.toString()
    );

  }, [darkMode]);


  // =========================
  // TODAY COMPLETION
  // =========================

  const syncTodayCompletion = (updatedHabits) => {

    const allCompleted =
      updatedHabits.length > 0 &&
      updatedHabits.every(
        (habit) => habit.completed
      );

    const today = new Date()
      .toISOString()
      .split("T")[0];


    if (allCompleted) {

      setCompletionDates((dates) => {

        if (dates.includes(today)) {
          return dates;
        }

        return [
          ...dates,
          today
        ];

      });

    } else {

      setCompletionDates((dates) =>
        dates.filter(
          (date) => date !== today
        )
      );

    }

  };


  // =========================
  // TOGGLE HABIT
  // =========================

  const toggleHabit = (id) => {

    const updatedHabits =
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed:
                !habit.completed
            }
          : habit
      );

    setHabits(updatedHabits);

    syncTodayCompletion(
      updatedHabits
    );

  };


  // =========================
  // ADD HABIT
  // =========================

  const addHabit = () => {

    if (newHabit.trim() === "") {
      return;
    }

    const habit = {
      id: Date.now(),
      name: newHabit.trim(),
      icon: "⭐",
      completed: false
    };

    setHabits([
      ...habits,
      habit
    ]);

    setNewHabit("");

  };


  // =========================
  // DELETE HABIT
  // =========================

  const deleteHabit = (id) => {

    const updatedHabits =
      habits.filter(
        (habit) => habit.id !== id
      );

    setHabits(updatedHabits);

    syncTodayCompletion(
      updatedHabits
    );

  };


  // =========================
  // WATER + 
  // =========================

  const increaseWater = () => {

    const newCount =
      Math.min(
        waterCount + 1,
        8
      );

    setWaterCount(newCount);


    const updatedHabits =
      habits.map((habit) =>
        habit.name === "Water Intake"
          ? {
              ...habit,
              completed:
                newCount === 8
            }
          : habit
      );

    setHabits(updatedHabits);

    syncTodayCompletion(
      updatedHabits
    );

  };


  // =========================
  // WATER -
  // =========================

  const decreaseWater = () => {

    const newCount =
      Math.max(
        waterCount - 1,
        0
      );

    setWaterCount(newCount);


    const updatedHabits =
      habits.map((habit) =>
        habit.name === "Water Intake"
          ? {
              ...habit,
              completed:
                newCount === 8
            }
          : habit
      );

    setHabits(updatedHabits);

    syncTodayCompletion(
      updatedHabits
    );

  };


  // =========================
  // RESET TODAY
  // =========================

  const resetDay = () => {

    const resetHabits =
      habits.map((habit) => ({
        ...habit,
        completed: false
      }));

    setHabits(resetHabits);

    setWaterCount(0);

    const today = new Date()
      .toISOString()
      .split("T")[0];

    setCompletionDates((dates) =>
      dates.filter(
        (date) => date !== today
      )
    );

  };


  // =========================
  // PROGRESS
  // =========================

  const completedHabits =
    habits.filter(
      (habit) => habit.completed
    ).length;


  const progress =
    habits.length === 0
      ? 0
      : Math.round(
          (completedHabits /
            habits.length) *
            100
        );


  // =========================
  // STREAK
  // =========================

  const calculateStreak = () => {

    let streak = 0;

    const date = new Date();

    while (true) {

      const dateString =
        date
          .toISOString()
          .split("T")[0];

      if (
        completionDates.includes(
          dateString
        )
      ) {

        streak++;

        date.setDate(
          date.getDate() - 1
        );

      } else {

        break;

      }

    }

    return streak;

  };


  const streak =
    calculateStreak();


  // =========================
  // LAST 7 DAYS
  // =========================

  const getLast7Days = () => {

    const days = [];

    for (
      let i = 6;
      i >= 0;
      i--
    ) {

      const date = new Date();

      date.setDate(
        date.getDate() - i
      );

      const dateString =
        date
          .toISOString()
          .split("T")[0];

      const dayName =
        date.toLocaleDateString(
          "en-US",
          {
            weekday: "short"
          }
        );

      days.push({
        date: dateString,
        day: dayName,
        completed:
          completionDates.includes(
            dateString
          )
      });

    }

    return days;

  };


  const weeklyData =
    getLast7Days();


  const weeklyCompleted =
    weeklyData.filter(
      (day) => day.completed
    ).length;


  // =========================
  // MOTIVATION
  // =========================

  const getMotivation = () => {

    if (progress === 100) {
      return "🎉 Amazing! You completed all your habits today!";
    }

    if (progress >= 75) {
      return "🔥 Almost there! Keep going!";
    }

    if (progress >= 50) {
      return "💪 Great progress! Don't stop now!";
    }

    if (progress > 0) {
      return "🌱 Good start! Keep building your routine!";
    }

    return "🚀 Start your first habit today!";
  };


  // =========================
  // RETURN
  // =========================

  return (

    <div
      className={
        `app ${
          darkMode
            ? "dark"
            : ""
        }`
      }
    >

      <div className="container">


        {/* THEME */}

        <button
          className="theme-button"
          onClick={() =>
            setDarkMode(
              !darkMode
            )
          }
        >
          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>


        {/* HEADER */}

        <h1>
          Personal Habit Tracker
        </h1>

        <p className="subtitle">
          Track your daily habits
          and build a better routine.
        </p>

        <p className="date">
          {new Date().toDateString()}
        </p>


        {/* PROGRESS */}

        <ProgressCard
          completedHabits={
            completedHabits
          }
          totalHabits={
            habits.length
          }
          progress={progress}
          streak={streak}
        />


        {/* MOTIVATION */}

        <div className="motivation">
          {getMotivation()}
        </div>


        {/* RESET */}

        <button
          className="reset-button"
          onClick={resetDay}
        >
          🔄 Reset Today's Progress
        </button>


        {/* WEEKLY */}

        <WeeklyStats
          weeklyData={weeklyData}
          weeklyCompleted={
            weeklyCompleted
          }
        />


        {/* ADD HABIT */}

        <AddHabit
          newHabit={newHabit}
          setNewHabit={
            setNewHabit
          }
          addHabit={addHabit}
        />


        {/* HABITS */}

        <div className="habits">

          {habits.map(
            (habit) => (

              <HabitCard
                key={habit.id}
                habit={habit}
                toggleHabit={
                  toggleHabit
                }
                deleteHabit={
                  deleteHabit
                }
                waterCount={
                  waterCount
                }
                increaseWater={
                  increaseWater
                }
                decreaseWater={
                  decreaseWater
                }
              />

            )
          )}

        </div>


        {/* FOOTER */}

        <p className="footer">
          Personal Habit Tracker
          • Build habits. Build yourself. 💪
        </p>


      </div>

    </div>

  );

}

export default App;