function ProgressCard({
  completedHabits,
  totalHabits,
  progress,
  streak
}) {
  return (
    <div className="progress-card">

      <h2>Today's Progress</h2>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="progress-info">
        <p>
          {completedHabits} of {totalHabits} habits completed
        </p>

        <strong>{progress}%</strong>
      </div>

      <div className="streak">
        <span className="streak-icon">🔥</span>

        <div>
          <p>Current Streak</p>
          <strong>{streak} days</strong>
        </div>
      </div>

    </div>
  );
}

export default ProgressCard;