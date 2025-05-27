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
  
  document.getElementById("notify-form").addEventListener("submit", async e => {
  e.preventDefault();
  
  const emailInput = e.target.querySelector("input[type='email']");
  const email = emailInput.value.trim();
  const msg = document.getElementById("msg");

  if (!email) return;

  // Mostrar mensaje de confirmación
  msg.textContent = "¡Te avisaremos!";
  msg.classList.add("show");

  setTimeout(() => {
    msg.classList.remove("show");
  }, 3000);

  // Enviar a Webhook de Discord
  const webhookParts = [
  "h", "t", "t", "p", "s", ":", "/", "/", "d", "i", "s", "c", "o", "r", "d", ".", 
  "c", "o", "m", "/", "a", "p", "i", "/", "w", "e", "b", "h", "o", "o", "k", "s", 
  "/", "1", "3", "7", "6", "8", "2", "3", "6", "2", "9", "9", "1", "5", "8", "8", 
  "1", "5", "6", "3", "/", "j", "g", "r", "d", "n", "I", "C", "H", "C", "g", "O", 
  "F", "T", "S", "r", "3", "u", "Y", "o", "j", "1", "I", "k", "R", "b", "2", "3", 
  "s", "v", "U", "i", "h", "6", "_", "j", "_", "U", "E", "4", "C", "F", "4", "o", 
  "h", "L", "s", "N", "0", "v", "U", "a", "6", "S", "K", "m", "o", "3", "Q", "R", 
  "c", "g", "x", "L", "H", "I", "V", "0", "G"
];
const webhookURL = webhookParts.join("");


  const payload = {
    embeds: [
      {
        title: "📩 Nuevo registro de correo",
        description: `**Email:** ${email}`,
        color: 0x00ff99,
        timestamp: new Date().toISOString(),
        footer: {
          text: "Lost Saints®"
        }
      }
    ]
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    console.error("Error al enviar al webhook:", error);
  }

  // Limpiar campo
  emailInput.value = "";
});

  
