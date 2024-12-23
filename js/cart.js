$(document).ready(function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCart() {
    const container = $("#cart-container");
    container.empty();
    let total = 0;

    if (cart.length === 0) {
      container.html("<p>Your cart is empty.</p>");
      $("#cart-total").text("0.00");
      return;
    }

    cart.forEach((perfume) => {
      const productHTML = `
                <div class="cart-item">
                    <img src="${perfume.image}" alt="${perfume.name}">
                    <div class="cart-item-details">
                        <h3>${perfume.name}</h3>
                        <p>${perfume.description}</p>
                        <p><strong>Price: $${perfume.price}</strong></p>
                        <!-- Quantity Controls -->
                        <div class="quantity-controls">
                            <button class="decrease-qty">-</button>
                            <input type="number" class="quantity-input" value="${perfume.quantity}" min="1">
                            <button class="increase-qty">+</button>
                        </div>
                        <button class="remove-from-cart" data-id="${perfume.id}">Remove</button>
                    </div>
                </div>
            `;
      container.append(productHTML);
      total += parseFloat(perfume.price) * perfume.quantity;
    });

    $("#cart-total").text(total.toFixed(2));
  }

  $(document).on("click", ".remove-from-cart", function () {
    const perfumeId = $(this).data("id");
    cart = cart.filter((item) => item.id !== perfumeId);
    localStorage.setItem("cart", JSON.stringify(cart));
    $("#cart-count").text(cart.length);
    displayCart();
  });

  $(document).on("click", ".increase-qty", function () {
    const perfumeId = $(this)
      .closest(".cart-item")
      .find(".remove-from-cart")
      .data("id");
    const item = cart.find((p) => p.id === perfumeId);
    if (item) {
      item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartCount();
    }
  });

  $(document).on("click", ".decrease-qty", function () {
    const perfumeId = $(this)
      .closest(".cart-item")
      .find(".remove-from-cart")
      .data("id");
    const item = cart.find((p) => p.id === perfumeId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartCount();
    }
  });

  $(document).on("change", ".quantity-input", function () {
    const newQuantity = parseInt($(this).val());
    const perfumeId = $(this)
      .closest(".cart-item")
      .find(".remove-from-cart")
      .data("id");
    const item = cart.find((p) => p.id === perfumeId);
    if (item && !isNaN(newQuantity) && newQuantity > 0) {
      item.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartCount();
    } else {
      alert("Please enter a valid quantity.");
      $(this).val(item.quantity);
    }
  });

  $("#checkout-button").on("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const total = $("#cart-total").text();
    $("#modal-cart-total").text(total);

    $("#checkout-modal").css("display", "block");
  });

  $(".close-button, #cancel-checkout").on("click", function () {
    $("#checkout-modal").css("display", "none");
  });

  $("#confirm-checkout").on("click", function () {
    showCustomAlert("Thank you for your purchase!", "success");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    $("#cart-count").text("0");
    displayCart();
    $("#checkout-modal").css("display", "none");
  });

  $(window).on("click", function (event) {
    if ($(event.target).is("#checkout-modal")) {
      $("#checkout-modal").css("display", "none");
    }
  });

  function updateCartCount() {
    $("#cart-count").text(cart.length);
  }

  function showCustomAlert(message, type) {
    const alertBox = $("<div>").addClass("custom-alert").text(message);
    $("body").append(alertBox);
    setTimeout(() => alertBox.addClass("show"), 10);
    setTimeout(() => {
      alertBox.removeClass("show");
      setTimeout(() => alertBox.remove(), 500);
    }, 3000);
  }

  updateCartCount();
  displayCart();

  $(document).ready(function () {
    function setupNav() {
      const isMobile = $(window).width() <= 700;

      if (isMobile) {
        console.log("hiiii");
        $(".nav-toggle")
          .off("click")
          .on("click", function () {
            $("nav ul").stop(true, true).slideToggle();
          });
        $("nav ul").hide();
      } else {
        $("nav ul").show();
        $(".nav-toggle").off("click");
      }
    }

    function debounce(func, wait) {
      let timeout;
      return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
      };
    }

    setupNav();
    $(window).resize(debounce(setupNav, 200));
  });
});
