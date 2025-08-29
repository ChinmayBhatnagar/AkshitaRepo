/* === Parallax scroll for elements with data-speed === */
const parallaxEls = [...document.querySelectorAll('[data-speed]')];
function onScroll() {
  const y = window.scrollY;

  // disable parallax on very small screens
  const isMobile = window.innerWidth < 600;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed || '0.2');
    if (!isMobile) {
      el.style.transform = `translate3d(0, ${y * speed * -0.3}px, 0)`;
    } else {
      el.style.transform = "none";
    }
  });
}
onScroll();
addEventListener("scroll", onScroll, { passive: true });

/* === Subtle 3D tilt on gallery cards (desktop only) === */
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
      card.style.transform = `rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });
}

/* === Typewriter for love letter === */
const typed = document.getElementById("typed");
if (typed) {
  const text = `Being with you feels like sunrise after a long night. 
I love the way you laugh, the way you listen, and the way you make every ordinary moment extraordinary.
Thank you for choosing me—today and always. ♡`;

  let i = 0;
  const speed = window.innerWidth < 600 ? 35 : 28; // slower on small screens
  const type = () => {
    if (i <= text.length) {
      typed.textContent = text.slice(0, i++);
      setTimeout(type, speed);
    } else {
      typed.style.borderRight = "2px solid transparent";
    }
  };
  setTimeout(type, 600);
}

/* === Soft background music (user gesture required) === */
const audio = document.getElementById("bgm");
const btn = document.getElementById("music-toggle");
if (btn && audio) {
  let playing = false;
  btn.addEventListener("click", async () => {
    try {
      if (!playing) {
        await audio.play();
        playing = true;
        btn.textContent = "❚❚";
        if (navigator.vibrate) navigator.vibrate(80); // haptic feedback
      } else {
        audio.pause();
        playing = false;
        btn.textContent = "♪";
        if (navigator.vibrate) navigator.vibrate(50);
      }
    } catch (e) {
      console.log(e);
    }
  });
}
