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

/* Build the environmental chain in order. */
const chainSteps = Array.from(document.querySelectorAll(".chain-step"));
const chainArrows = Array.from(document.querySelectorAll(".chain-arrow"));
const chainCopy = document.getElementById("chainCopy");
let nextChainStep = 0;

if (chainSteps[0]) {
  chainSteps[0].classList.add("next-step");
}

chainSteps.forEach(function (step, index) {
  step.addEventListener("click", function () {
    if (index !== nextChainStep) return;

    step.classList.remove("next-step");
    step.classList.add("explored");
    step.disabled = true;
    chainCopy.textContent = step.dataset.copy;

    if (chainArrows[index]) {
      chainArrows[index].classList.add("active");
    }

    nextChainStep += 1;

    if (nextChainStep < chainSteps.length) {
      chainSteps[nextChainStep].disabled = false;
      chainSteps[nextChainStep].classList.add("next-step");
    } else {
      chainCopy.textContent = "Chain complete: manufacturing replacement materials contributes to greenhouse gas emissions.";
      markSection("environment");
    }
  });
});

/* Explore Air, Water, and Soil. */
const earthHotspots = document.querySelectorAll(".earth-hotspot");
const earthTitle = document.getElementById("earthInfoTitle");
const earthText = document.getElementById("earthInfoText");
const earthCompletion = document.getElementById("earthCompletion");
const exploredHealth = new Set();

earthHotspots.forEach(function (hotspot) {
  hotspot.addEventListener("click", function () {
    earthHotspots.forEach(function (item) {
      item.classList.remove("active");
    });

    hotspot.classList.add("active", "explored");
    earthTitle.textContent = hotspot.dataset.title;
    earthText.textContent = hotspot.dataset.text;
    exploredHealth.add(hotspot.dataset.title);

    if (exploredHealth.size === earthHotspots.length) {
      earthCompletion.classList.add("visible");
      markSection("health");
    }
  });
});

/* Reveal the healthcare and client story one step at a time. */
const storyCards = Array.from(document.querySelectorAll(".industry-column"));
const storyConnectors = Array.from(document.querySelectorAll(".story-connector"));
const storyNext = document.getElementById("storyNext");
const storyStatus = document.getElementById("storyStatus");
let visibleStoryCards = 1;

if (storyNext) {
  storyNext.addEventListener("click", function () {
    if (visibleStoryCards >= storyCards.length) return;

    const connector = storyConnectors[visibleStoryCards - 1];
    const nextCard = storyCards[visibleStoryCards];

    if (connector) connector.classList.add("story-visible");
    if (nextCard) nextCard.classList.add("story-visible");

    visibleStoryCards += 1;

    if (visibleStoryCards === 2) {
      storyStatus.textContent = "Step 2 of 3: Client Expectations";
      storyNext.textContent = "Continue to Acumetis Alignment →";
    } else {
      storyStatus.textContent = "Step 3 of 3: Acumetis Alignment";
      storyNext.textContent = "Healthcare story complete ✓";
      storyNext.disabled = true;
      markSection("industry");
    }
  });
}

/* Gently reveal major content as it enters the viewport. */
const revealTargets = document.querySelectorAll(
  ".section .container > h2, .section-intro, .industry-intro, .impact-chain, .earth-explorer, .fact-feature, .industry-story, .client-conclusion, .summary-grid"
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach(function (item) {
    item.classList.add("in-view");
  });
} else {
  revealTargets.forEach(function (item) {
    item.classList.add("scroll-reveal");
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(function (item) {
    observer.observe(item);
  });
}

const completeButton = document.getElementById("completeButton");
const completeMessage = document.getElementById("completeMessage");

completeButton.addEventListener("click", function () {
  completeMessage.classList.add("visible");
  completeButton.textContent = "Module complete ✓";
});
