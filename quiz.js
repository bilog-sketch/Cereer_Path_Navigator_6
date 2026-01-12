document.addEventListener("DOMContentLoaded", () => {
  const resultsSection = document.getElementById("results");
  const homeSection = document.getElementById("home");
  const quizSection = document.getElementById("quiz");

  // Always start at Home on refresh
  if (homeSection) homeSection.classList.add("active");
  if (resultsSection) resultsSection.classList.remove("active");
  if (quizSection) quizSection.classList.remove("active");

  // Keep saved result in memory but don't show it until user clicks "My Results"
  const savedResult = localStorage.getItem("quizResult");
  if (savedResult) {
    resultsSection.innerHTML = savedResult;
  }
});

document.getElementById("quizForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let scores = { STEM: 0, HUMSS: 0, ABM: 0, TVL: 0 };
  const answers = document.querySelectorAll("#quizForm input[type=radio]:checked");

  answers.forEach(answer => {
    if (answer.value === "yes") {
      const strand = answer.dataset.strand;
      if (strand) scores[strand] += 1;
    }
  });

  let highestScore = Math.max(...Object.values(scores));
  let recommendedStrands = Object.keys(scores).filter(strand => scores[strand] === highestScore);

  const resultHTML = `
    <h2>Your Personalized Results</h2>
    <p style="margin-bottom: 20px; color: #666;">
      Based on your answers, we recommend: <strong>${recommendedStrands.join(", ")}</strong>
    </p>
    <p>Score breakdown:</p>
    <ul>
      <li>STEM: ${scores.STEM}</li>
      <li>HUMSS: ${scores.HUMSS}</li>
      <li>ABM: ${scores.ABM}</li>
      <li>TVL: ${scores.TVL}</li>
    </ul>
  `;

  const resultsSection = document.getElementById("results");
  const homeSection = document.getElementById("home");
  const quizSection = document.getElementById("quiz");

  resultsSection.innerHTML = resultHTML;
  localStorage.setItem("quizResult", resultHTML);

  // Show results, hide others
  resultsSection.classList.add("active");
  if (homeSection) homeSection.classList.remove("active");
  if (quizSection) quizSection.classList.remove("active");
});