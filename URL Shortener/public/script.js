document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("modeToggle");
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggle.checked = true;
  }

  // Toggle theme switch
  toggle.addEventListener("change", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
  });

  // Auto focus input
  document.getElementById("longUrl").focus();
});

window.shortenUrl = async function () {
  const input = document.getElementById("longUrl");
  const longUrl = input.value.trim();
  if (!longUrl) return;

  try{  const response = await fetch("http://localhost:5000/api/url/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: longUrl }),
    });  
    
    const data = await response.json();
    if (data.shortUrl) {
      const shortUrlEl = document.getElementById("shortUrl");
      shortUrlEl.href = data.shortUrl;
      shortUrlEl.textContent = data.shortUrl;

      document.getElementById("result").classList.remove("hidden");
      input.value = "";
    }
  }
  catch(error) {
    return res.status(400).send({ message: "The URL is not valid" });
  }
};

window.copyToClipboard = function (id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied to clipboard!");
  });
};

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// Support "Enter" key
document.getElementById("longUrl").addEventListener("keydown", (e) => {
  if (e.key === "Enter") window.shortenUrl();
});
