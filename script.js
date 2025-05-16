const countdown = () => {
    const dropDate = new Date("2025-06-01T00:00:00Z").getTime();
    const now = new Date().getTime();
    const diff = dropDate - now;
  
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
  
    document.getElementById("days").textContent = d.toString().padStart(2, '0');
    document.getElementById("hours").textContent = h.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = m.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = s.toString().padStart(2, '0');
  
    if (diff <= 0) {
      document.querySelector(".drop-title").textContent = "DROP ACTIVADO";
      document.getElementById("countdown").style.display = "none";
      document.body.classList.add("glitch");
    }
  };
  
  setInterval(countdown, 1000);
  
  document.getElementById("notify-form").addEventListener("submit", e => {
    e.preventDefault();
    const msg = document.getElementById("msg");
    msg.textContent = "¡Te avisaremos!";
    msg.classList.add("show");
    
    setTimeout(() => {
      msg.classList.remove("show");
    }, 3000);
  });
  