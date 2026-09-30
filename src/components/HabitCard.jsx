function HabitCard({
  habit,
  toggleHabit,
  deleteHabit,
  waterCount,
  increaseWater,
  decreaseWater
}) {

  return (

    <div
      className={
        `habit ${
          habit.completed
            ? "completed"
            : ""
        }`
      }
    >

      <div className="habit-info">

        <span className="icon">
          {habit.icon}
        </span>

        <span className="habit-name">
          {habit.name}
        </span>

      </div>


      <div className="habit-buttons">

        {habit.name === "Water Intake" ? (

          <div className="water-controls">

            <button
              className="water-button"
              onClick={decreaseWater}
            >
              −
            </button>

            <span className="water-count">
              {waterCount} / 8 glasses
            </span>

            <button
              className="water-button"
              onClick={increaseWater}
            >
              +
            </button>

          </div>

        ) : (

          <button
            className="complete-button"
            onClick={() =>
              toggleHabit(
                habit.id
              )
            }
          >
            {habit.completed
              ? "✓ Done"
              : "Complete"}
          </button>

        )}


        <button
          className="delete-button"
          onClick={() =>
            deleteHabit(
              habit.id
            )
          }
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default HabitCard;