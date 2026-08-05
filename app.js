const exploredSections = new Set();
const totalSections = 3;

const progressLabel = document.getElementById("progressLabel");
const progressBar = document.getElementById("progressBar");

function markSection(name) {
  exploredSections.add(name);
  const count = exploredSections.size;
  progressLabel.textContent = count + " of " + totalSections + " sections explored";
  progressBar.style.width = ((count / totalSections) * 100) + "%";
}

const chainSteps = document.querySelectorAll(".chain-step");
const chainCopy = document.getElementById("chainCopy");
const exploredChain = new Set();

chainSteps.forEach(function (step, index) {
  step.addEventListener("click", function () {
    step.classList.add("explored");
    chainCopy.textContent = step.dataset.copy;
    exploredChain.add(index);

    if (exploredChain.size === chainSteps.length) {
      markSection("environment");
    }
  });
});

const earthHotspots = document.querySelectorAll(".earth-hotspot");
const earthTitle = document.getElementById("earthInfoTitle");
const earthText = document.getElementById("earthInfoText");
const exploredHealth = new Set(["Air Pollution"]);

earthHotspots.forEach(function (hotspot) {
  hotspot.addEventListener("click", function () {
    earthHotspots.forEach(function (item) {
      item.classList.remove("active");
    });

    hotspot.classList.add("active");
    earthTitle.textContent = hotspot.dataset.title;
    earthText.textContent = hotspot.dataset.text;
    exploredHealth.add(hotspot.dataset.title);

    if (exploredHealth.size === earthHotspots.length) {
      markSection("health");
    }
  });
});

const priorityPills = document.querySelectorAll(".priority-pill");
const exploredPriorities = new Set();

priorityPills.forEach(function (pill, index) {
  pill.addEventListener("click", function () {
    pill.classList.add("explored");
    exploredPriorities.add(index);

    if (exploredPriorities.size === priorityPills.length) {
      markSection("industry");
    }
  });
});

const completeButton = document.getElementById("completeButton");
const completeMessage = document.getElementById("completeMessage");

completeButton.addEventListener("click", function () {
  completeMessage.classList.add("visible");
  completeButton.textContent = "Module complete ✓";
});
