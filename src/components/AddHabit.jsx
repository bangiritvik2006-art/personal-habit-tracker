function AddHabit({
  newHabit,
  setNewHabit,
  addHabit
}) {

  return (

    <div className="add-habit">

      <input
        type="text"
        placeholder="Enter a new habit..."
        value={newHabit}
        onChange={(e) =>
          setNewHabit(
            e.target.value
          )
        }
        onKeyDown={(e) => {

          if (e.key === "Enter") {
            addHabit();
          }

        }}
      />

      <button
        onClick={addHabit}
      >
        + Add Habit
      </button>

    </div>

  );

}

export default AddHabit;