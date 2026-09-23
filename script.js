```javascript
/*
==========================================
GOOGLE APPS SCRIPT WEB APP URL
==========================================

GANTI URL DI BAWAH DENGAN URL WEB APP
APPS SCRIPT MILIKMU.

Pastikan berakhir dengan /exec
*/

const API_URL =
  "https://script.google.com/macros/s/AKfycbyJElU5EZMHJjRysyQ2VSP88HxYLXx8bq9VtZ00QFpip4j_HEK3xm8pApUO4dPJhufi/exec";



/*
==========================================
FORM
==========================================
*/

const form =
  document.getElementById(
    "reservationForm"
  );

const submitBtn =
  document.getElementById(
    "submitBtn"
  );



form.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();


    const data = {

      nama:
        document.getElementById(
          "nama"
        ).value.trim(),

      email:
        document.getElementById(
          "email"
        ).value.trim(),

      phone:
        document.getElementById(
          "phone"
        ).value.trim(),

      room:
        document.getElementById(
          "room"
        ).value,

      checkin:
        document.getElementById(
          "checkin"
        ).value,

      checkout:
        document.getElementById(
          "checkout"
        ).value,

      guests:
        document.getElementById(
          "guests"
        ).value,

      payment:
        document.getElementById(
          "payment"
        ).value,

      notes:
        document.getElementById(
          "notes"
        ).value.trim()

    };


    /*
    Validasi tanggal
    */

    if (
      data.checkout <=
      data.checkin
    ) {

      alert(
        "Tanggal check-out harus setelah check-in."
      );

      return;

    }


    /*
    Loading
    */

    submitBtn.disabled = true;

    submitBtn.innerText =
      "Mengirim...";


    try {


      /*
      Kirim data ke Apps Script
      */

      const response =
        await fetch(
          API_URL,
          {

            method: "POST",

            body:
              JSON.stringify(data)

          }
        );


      const result =
        await response.json();


      /*
      Berhasil
      */

      if (result.success) {

        document.getElementById(
          "bookingId"
        ).innerText =
          result.bookingId;


        document.getElementById(
          "successModal"
        ).style.display =
          "flex";


        form.reset();

      }

      else {

        alert(
          "Reservasi gagal: " +
          result.message
        );

      }


    }

    catch (error) {

      console.error(error);

      alert(
        "Tidak dapat menghubungi server reservasi."
      );

    }


    /*
    Kembalikan tombol
    */

    submitBtn.disabled = false;

    submitBtn.innerText =
      "Kirim Reservasi";

  }
);



/*
==========================================
MODAL
==========================================
*/

function closeModal() {

  document.getElementById(
    "successModal"
  ).style.display =
    "none";

}



/*
==========================================
MINIMUM DATE
==========================================
*/

const today =
  new Date()
    .toISOString()
    .split("T")[0];


document.getElementById(
  "checkin"
).min = today;


document.getElementById(
  "checkout"
).min = today;


document.getElementById(
  "checkin"
).addEventListener(
  "change",
  function() {

    document.getElementById(
      "checkout"
    ).min = this.value;

  }
);
```
