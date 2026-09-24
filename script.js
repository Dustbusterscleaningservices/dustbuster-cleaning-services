const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

const quoteForm = document.getElementById("quote-form");
const fallback = document.getElementById("form-fallback");
const preview = document.getElementById("quote-preview");
const copyButton = document.getElementById("copy-quote");

quoteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = new FormData(quoteForm);
  const value = function (key) {
    return (data.get(key) || "").toString().trim();
  };

  const lines = [
    "Hi The Dustbusters! I'd like a free cleaning quote.",
    "",
    "Name: " + value("name"),
    "Phone: " + value("phone"),
    "City/Area: " + value("city"),
    "Service: " + value("service")
  ];

  if (value("sqft")) lines.push("Approx. Sq Ft: " + value("sqft"));
  if (value("beds")) lines.push("Bedrooms: " + value("beds"));
  if (value("baths")) lines.push("Bathrooms: " + value("baths"));
  if (value("notes")) lines.push("Notes: " + value("notes"));

  const message = lines.join("\n");
  preview.textContent = message;
  fallback.hidden = false;

  const sms = "sms:18634442040?&body=" + encodeURIComponent(message);
  window.location.href = sms;
});

copyButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(preview.textContent);
    copyButton.textContent = "Copied!";
    setTimeout(function () {
      copyButton.textContent = "Copy Quote Details";
    }, 1800);
  } catch (e) {
    window.prompt("Copy your quote details:", preview.textContent);
  }
});