function WeeklyStats({
  weeklyData,
  weeklyCompleted
}) {

  return (
    <div className="weekly-card">

      <h2>
        Weekly Progress
      </h2>

      <div className="weekly-days">

        {weeklyData.map((day) => (

          <div
            className="week-day"
            key={day.date}
          >

            <span className="day-name">
              {day.day}
            </span>

            <span
              className={
                day.completed
                  ? "day-status completed-day"
                  : "day-status"
              }
            >
              {day.completed
                ? "✓"
                : "✗"}
            </span>

          </div>

        ))}

      </div>

      <p className="weekly-summary">
        Completed days:{" "}
        <strong>
          {weeklyCompleted} / 7
        </strong>
      </p>

    </div>
  );
}

export default WeeklyStats;