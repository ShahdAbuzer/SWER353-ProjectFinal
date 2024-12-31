$(document).ready(function () {
  $("#contact-form").on("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    $(".error-message").text("");
    $("#success-message").text("");

    const firstName = $("#first-name").val().trim();
    if (firstName === "") {
      isValid = false;
      $("#first-name-error").text("First name is required.");
    }

    const lastName = $("#last-name").val().trim();
    if (lastName === "") {
      isValid = false;
      $("#last-name-error").text("Last name is required.");
    }

    const mobile = $("#mobile").val().trim();
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      isValid = false;
      $("#mobile-error").text("Enter a valid 10-digit mobile number.");
    }

    const address = $("#address").val().trim();
    if (address === "") {
      isValid = false;
      $("#address-error").text("Address is required.");
    }

    const age = $("#age").val().trim();
    if (age === "" || age < 1 || age > 120) {
      isValid = false;
      $("#age-error").text("Enter a valid age between 1 and 120.");
    }

    const hobbies = $("#hobbies").val().trim();
    if (hobbies === "") {
      isValid = false;
      $("#hobbies-error").text("Hobbies are required.");
    }

    const country = $("#country").val();
    if (country === "") {
      isValid = false;
      $("#country-error").text("Please select a country.");
    }

    const email = $("#email").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      $("#email-error").text("Enter a valid email address.");
    }

    const message = $("#message").val().trim();
    if (message === "") {
      isValid = false;
      $("#message-error").text("Message is required.");
    }

    if (isValid) {
      showCustomAlert("Your message has been sent successfully!", "success");

      $("#contact-form")[0].reset();
    }
  });
});

function showCustomAlert(message, type) {
  let alertContainer = $('.custom-alert-container');
  if (!alertContainer.length) {
    $('body').append('<div class="custom-alert-container"></div>');
    alertContainer = $('.custom-alert-container');
    alertContainer.css({
      position: 'fixed',
      bottom: '0',
      right: '0',
      width: '300px',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column'
    });
  }

  const alertBox = $("<div>").addClass("custom-alert").text(message);

  if (type === "success") {
    alertBox.addClass("alert-success");
  } else if (type === "error") {
    alertBox.addClass("alert-error");
  }
  alertContainer.append(alertBox);

  setTimeout(() => alertBox.addClass("show"), 10);

  setTimeout(() => {
    alertBox.removeClass("show");
    setTimeout(() => alertBox.remove(), 500);
  }, 3000);
}
