const API_URL = "https://script.google.com/macros/s/AKfycbzXLVsRsKO7-eonGtFVCIJ8fkYRj3HNrkGjGawlx5QU79MToJp8vnvaZzrGlJzfjgI5Hg/exec";

const form = document.getElementById("reservationForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  event.stopPropagation();

  const submitBtn = form.querySelector('button[type="submit"]');

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

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim...";
  }

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
    console.error("Reservation error:", error);
    alert("Gagal mengirim reservasi. Silakan coba lagi.");
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Kirim Reservasi";
  }
});

function closeModal() {
  document.getElementById("successModal").style.display = "none";
}


function closeModal() {
  document.getElementById("successModal").style.display = "none";
}
