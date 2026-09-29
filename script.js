/* =========================
   FITLIFE DATA
========================= */

let data = JSON.parse(
  localStorage.getItem("fitlife")
) || {

  steps: 8432,

  calories: 432,

  workouts: 1,

  streak: 5,

  water: 1.5,

  goals: {
    steps: 10000,
    calories: 600,
    water: 2.5
  },

  activities: []

};


/* =========================
   SAVE DATA
========================= */

function saveData() {

  localStorage.setItem(
    "fitlife",
    JSON.stringify(data)
  );

}


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(page, button) {

  document
    .querySelectorAll(".page")
    .forEach(section => {

      section.classList.remove(
        "active-page"
      );

    });


  document
    .getElementById(page)
    .classList.add("active-page");


  document
    .querySelectorAll(".nav")
    .forEach(nav => {

      nav.classList.remove("active");

    });


  if (button) {

    button.classList.add("active");

  }

}


/* =========================
   DARK MODE
========================= */

function toggleDarkMode() {

  document.body.classList.toggle("dark");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
  );

}


if (
  localStorage.getItem("darkMode")
  === "true"
) {

  document.body.classList.add("dark");

}


/* =========================
   MODAL
========================= */

function openModal() {

  document
    .getElementById("modal")
    .classList.add("open");

}


function closeModal() {

  document
    .getElementById("modal")
    .classList.remove("open");

}


/* =========================
   ADD ACTIVITY
========================= */

function saveActivity() {

  const type =
    document.getElementById(
      "activityType"
    ).value;

  const duration =
    Number(
      document.getElementById(
        "duration"
      ).value
    );

  const calories =
    Number(
      document.getElementById(
        "activityCalories"
      ).value
    );

  const steps =
    Number(
      document.getElementById(
        "activitySteps"
      ).value
    );


  const activity = {

    type: type,

    duration: duration,

    calories: calories,

    steps: steps,

    date: "Today"

  };


  data.activities.unshift(
    activity
  );


  data.steps += steps;

  data.calories += calories;

  data.workouts += 1;


  saveData();

  updateDashboard();

  addActivityToTable(activity);

  addWorkoutToList(activity);

  closeModal();

}


/* =========================
   UPDATE DASHBOARD
========================= */

function updateDashboard() {

  document.getElementById(
    "steps"
  ).textContent =
    data.steps.toLocaleString();


  document.getElementById(
    "calories"
  ).textContent =
    data.calories.toLocaleString();


  document.getElementById(
    "workouts"
  ).textContent =
    data.workouts;


  document.getElementById(
    "streak"
  ).textContent =
    data.streak;


  const stepPercentage =
    Math.min(
      100,
      data.steps /
      data.goals.steps *
      100
    );


  const caloriePercentage =
    Math.min(
      100,
      data.calories /
      data.goals.calories *
      100
    );


  document.querySelector(
    ".stat:nth-child(1) .progress span"
  ).style.width =
    stepPercentage + "%";


  document.querySelector(
    ".stat:nth-child(2) .progress span"
  ).style.width =
    caloriePercentage + "%";


  document.getElementById(
    "water"
  ).textContent =
    data.water.toFixed(1);


  const waterPercentage =
    Math.min(
      100,
      data.water /
      data.goals.water *
      100
    );


  document.getElementById(
    "waterProgress"
  ).style.width =
    waterPercentage + "%";


  updateWaterCups();

}


/* =========================
   WATER
========================= */

function addWater() {

  data.water += 0.25;

  if (
    data.water >
    data.goals.water
  ) {

    data.water =
      data.goals.water;

  }


  saveData();

  updateDashboard();

}


function updateWaterCups() {

  const filled =
    Math.round(
      data.water / 0.25
    );

  const total =
    Math.round(
      data.goals.water / 0.25
    );


  let result = "";


  for (
    let i = 0;
    i < total;
    i++
  ) {

    if (i < filled) {

      result += "🥛 ";

    } else {

      result += "▫ ";

    }

  }


  document.getElementById(
    "cups"
  ).textContent = result;

}


/* =========================
   CHART
========================= */

function changeChart(
  type,
  button
) {

  document
    .querySelectorAll(".tab")
    .forEach(tab => {

      tab.classList.remove(
        "active"
      );

    });


  button.classList.add("active");


  const chart =
    document.getElementById(
      "bars"
    );


  let values;


  if (type === "steps") {

    values =
      [55,54,68,53,70,88,70];

  }

  else if (
    type === "calories"
  ) {

    values =
      [45,55,60,50,70,85,72];

  }

  else {

    values =
      [30,40,20,50,55,80,50];

  }


  const days =
    [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ];


  chart.innerHTML = "";


  values.forEach(
    (value,index) => {

      const container =
        document.createElement(
          "div"
        );

      container.className =
        "bar-container";


      container.innerHTML = `

        <div
          class="bar"
          style="
            height:${value}%
          "
        ></div>

        <small>
          ${days[index]}
        </small>

      `;


      chart.appendChild(
        container
      );

    }

  );

}


/* =========================
   ACTIVITY TABLE
========================= */

function addActivityToTable(
  activity
) {

  const rows =
    document.getElementById(
      "activityRows"
    );


  const row =
    document.createElement(
      "div"
    );


  row.className =
    "table-row";


  row.innerHTML = `

    <span>
      ${activity.type}
    </span>

    <span>
      ${activity.duration} min
    </span>

    <span>
      ${activity.calories} kcal
    </span>

    <span>
      ${activity.steps.toLocaleString()}
    </span>

  `;


  rows.prepend(row);

}


/* =========================
   WORKOUT LIST
========================= */

function addWorkoutToList(
  activity
) {

  const list =
    document.getElementById(
      "workoutList"
    );


  const workout =
    document.createElement(
      "div"
    );


  workout.className =
    "workout";


  workout.innerHTML = `

    <div class="workout-icon">
      🏋
    </div>

    <div>

      <strong>
        ${activity.type}
      </strong>

      <small>
        ${activity.duration}
        min ·
        ${activity.calories}
        cal
      </small>

    </div>

    <span>
      Today
    </span>

  `;


  list.prepend(workout);

}


/* =========================
   GOALS
========================= */

function saveGoals() {

  const steps =
    Number(
      document.getElementById(
        "stepGoal"
      ).value
    );


  const calories =
    Number(
      document.getElementById(
        "calorieGoal"
      ).value
    );


  const water =
    Number(
      document.getElementById(
        "waterGoal"
      ).value
    );


  data.goals = {

    steps: steps,

    calories: calories,

    water: water

  };


  saveData();

  updateDashboard();


  document.getElementById(
    "goalMessage"
  ).textContent =
    "✓ Goals saved successfully!";

}


/* =========================
   LOAD ACTIVITIES
========================= */

function loadActivities() {

  data.activities
    .forEach(activity => {

      addActivityToTable(
        activity
      );

      addWorkoutToList(
        activity
      );

    });

}


/* =========================
   INITIALIZE
========================= */

updateDashboard();

loadActivities();