// Change navbar background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.background = "#000";
    nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
  } else {
    nav.style.background = "transparent";
    nav.style.boxShadow = "none";
  }
});

// Interactive Chips
const chips = document.querySelectorAll(".chip");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelector(".chip.active").classList.remove("active");
    chip.classList.add("active");
  });
});
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.background = "rgba(10, 10, 12, 0.8)";
    nav.style.border = "1px solid rgba(255, 255, 255, 0.05)";
  } else {
    nav.style.background = "rgba(255, 255, 255, 0.04)";
    nav.style.border = "1px solid rgba(255, 255, 255, 0.1)";
  }
});
const form = document.getElementById("contact-form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Booking your class...";
  result.style.color = "white";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let res = await response.json();
      if (response.status == 200) {
        result.innerHTML = "SUCCESS! We will contact you shortly.";
        result.style.color = "#ffeb3b";
        form.reset();
      } else {
        result.innerHTML = res.message;
        result.style.color = "#ff4444";
      }
    })
    .catch((error) => {
      result.innerHTML = "Network error. Please try again.";
      result.style.color = "#ff4444";
    });
});
