const WHATSAPP_NUMBER = "221764764758";

const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// Boutons WhatsApp
document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = waLink(el.dataset.wa);
  el.target = "_blank";
  el.rel = "noopener";
});

// Menu mobile
const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  })
);

// Choix d'un pack : pré-remplit le formulaire
const form = document.getElementById("devis");
document.querySelectorAll("[data-pack]").forEach((btn) =>
  btn.addEventListener("click", () => {
    form.elements.pack.value = btn.dataset.pack;
  })
);

// Envoi de la demande sur WhatsApp
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = form.querySelector(".err");
  const nom = form.elements.nom.value.trim();
  if (!nom) {
    err.hidden = false;
    form.elements.nom.focus();
    return;
  }
  err.hidden = true;
  const pack = form.elements.pack.value;
  const msg = form.elements.msg.value.trim();
  const text =
    `Bonjour MsTECH, je m'appelle ${nom}.\n` +
    `Pack souhaité : ${pack}.\n` +
    (msg ? `Mon activité : ${msg}` : "");
  window.open(waLink(text), "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();
