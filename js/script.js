// 1️⃣ 카운팅 애니메이션
const counters = document.querySelectorAll(".count");
const intervalTime = 80; // 숫자 간격(밀리초)

counters.forEach((counter) => {
  const start = +counter.getAttribute("data-start");
  const end = +counter.getAttribute("data-end");
  let current = start;

  const updateCount = () => {
    if (current < end) {
      current++;
      counter.innerText = current;
      setTimeout(updateCount, intervalTime);
    }
  };
  updateCount();
});

// 2️⃣ 여러 개의 게이지바 애니메이션
const gaugeContainers = document.querySelectorAll(".gauge-container");

const gaugeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 각 게이지 컨테이너에서 gauge-fill을 찾아서 width 설정
        const gaugeFill = entry.target.querySelector(".gauge-fill");
        const fillPercent = entry.target.getAttribute("data-percent") || "70%"; // data-percent 없으면 기본값
        gaugeFill.style.width = fillPercent;
      }
    });
  },
  { threshold: 0.5 }
);

gaugeContainers.forEach((container) => gaugeObserver.observe(container));
