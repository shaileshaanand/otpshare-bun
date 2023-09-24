const copy = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log({ text });
      Toastify({
        text: "Copied",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#1E3A8A",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    })
    .catch((err) => {
      Toastify({
        text: "Error while copying",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#E11D48",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      console.error(err);
    });
};
