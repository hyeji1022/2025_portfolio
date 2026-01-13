document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // 게이지바 애니메이션
  // ===============================
  const gaugeContainers = document.querySelectorAll(".gauge-container");

  if (gaugeContainers.length) {
    const gaugeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const gaugeFill = entry.target.querySelector(".gauge-fill");
            if (!gaugeFill) return;

            const fillPercent =
              entry.target.getAttribute("data-percent") || "70%";

            gaugeFill.style.width = fillPercent;
          }
        });
      },
      { threshold: 0.5 }
    );

    gaugeContainers.forEach((container) => gaugeObserver.observe(container));
  }

  // ===============================
  // 타이틀 타이핑 애니메이션
  // ===============================
  const text = "2026 Portfolio";
  const target = document.getElementById("text");
  const cursor = document.getElementById("cursor");

  if (target && cursor) {
    let index = 0;
    let blinkCount = 0;
    const maxBlink = 3;
    let blinkInterval;

    function typeEffect() {
      if (index < text.length) {
        target.textContent += text[index];
        index++;

        const speed = 60 + Math.random() * 80;
        setTimeout(typeEffect, speed);
      } else {
        startBlink();
      }
    }

    function startBlink() {
      blinkInterval = setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";

        blinkCount++;

        if (blinkCount >= maxBlink * 2) {
          clearInterval(blinkInterval);
          cursor.style.opacity = "1";
        }
      }, 300);
    }

    setTimeout(typeEffect, 500);
  }

  // ===============================
  // 사이드 메뉴 토글
  // ===============================
  const toggleBtn = document.getElementById("menuToggle");
  const sideNav = document.getElementById("sideNav");

  if (toggleBtn && sideNav) {
    toggleBtn.addEventListener("click", () => {
      sideNav.classList.toggle("open");
    });

    const navLinks = document.querySelectorAll(".side-nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        sideNav.classList.remove("open");
      });
    });
  }

  // ===============================
  // 이미지 모달
  // ===============================
  const modal = document.getElementById("imageModal");

  if (modal) {
    const modalImg = modal.querySelector("img");
    const overlay = modal.querySelector(".modal-overlay");
    const loader = modal.querySelector(".loader");
    const backBtn = modal.querySelector(".modal-back");

    document.querySelectorAll(".project-thumb").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const imgSrc = link.getAttribute("href");

        modal.classList.add("active");
        loader && (loader.style.display = "block");
        modalImg && (modalImg.style.display = "none");

        if (modalImg) modalImg.src = imgSrc;
        modal.scrollTop = 0;
      });
    });

    if (modalImg) {
      modalImg.onload = () => {
        const naturalWidth = modalImg.naturalWidth;

        modalImg.style.maxWidth = `${naturalWidth}px`;
        modalImg.style.width = "100%";

        loader && (loader.style.display = "none");
        modalImg.style.display = "block";
      };
    }

    function closeModal() {
      modal.classList.remove("active");

      setTimeout(() => {
        if (modalImg) {
          modalImg.src = "";
          modalImg.style.maxWidth = "";
        }
      }, 300);
    }

    overlay && overlay.addEventListener("click", closeModal);
    backBtn && backBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // ===============================
  // 스크롤 Reveal 애니메이션
  // ===============================
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01 }
    );

    reveals.forEach((el) => observer.observe(el));
  }
});
