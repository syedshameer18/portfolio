// Typing effect
const roles = ["Java Developer", "Full-Stack Learner", "Tech Enthusiast"];
let i = 0;
const text = document.querySelector(".typing-text");
function typingEffect() {
  text.textContent = roles[i];
  i = (i + 1) % roles.length;
  setTimeout(typingEffect, 2000);
}
typingEffect();

// Section reveal animation
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
});
sections.forEach(sec => observer.observe(sec));

// Cursor glow tracking
const cursor = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});