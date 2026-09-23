const API_URL = "https://script.google.com/macros/s/AKfycbyJElU5EZMHJjRysyQ2VSP88HxYLXx8bq9VtZ00QFpip4j_HEK3xm8pApUO4dPJhufi/exec";

const form = document.getElementById("reservationForm");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (API_URL === "https://script.google.com/macros/s/AKfycbyJElU5EZMHJjRysyQ2VSP88HxYLXx8bq9VtZ00QFpip4j_HEK3xm8pApUO4dPJhufi/exec") {
    alert("URL Apps Script belum dimasukkan ke script.js.");
    return;
  }

  const data = {
    nama: document.getElementById("nama").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    room: document.getElementById("room").value,
    checkin: document.getElementById("checkin").value,
    checkout: document.getElementById("checkout").value,
    guests: document.getElementById("guests").value,
    payment: document.getElementById("payment").value,
    notes: document.getElementById("notes").value
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Mengirim...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById("bookingId").textContent = result.bookingId;
      document.getElementById("successModal").style.display = "flex";

      form.reset();
    } else {
      alert(result.message || "Reservasi gagal.");
    }

  } catch (error) {
    console.error(error);
    alert("Gagal mengirim reservasi. Cek URL Apps Script dan deployment.");
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Kirim Reservasi";
});


function closeModal() {
  document.getElementById("successModal").style.display = "none";
}
