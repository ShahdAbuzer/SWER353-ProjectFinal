$(document).ready(function () {
  // Function to update cart count based on total quantities
  
  const apiURL = "https://jsonplaceholder.typicode.com/posts";
  const images = [
    "images/t1.png",
    "images/t2.png",
    "images/t3.png",
    "images/t4.png",
    "images/t6.png",
    "images/t7.png",
    "images/per.png",
  ];
  let perfumes = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function loadProducts() {
    $.ajax({
      url: apiURL,
      method: "GET",
      dataType: "json",
      success: function (data) {
        perfumes = data.slice(0,4).map((item) => ({
          id: item.id,
          name: `Perfume ${item.id}`,
          description: item.body.substring(0, 100) + "...",
          image: images[(item.id - 1) % images.length],
        }));

        displayProducts(perfumes);
      },
      error: function (err) {
        $("#products-container, #featured-products-container").html(
          "<p>Failed to load products. Please try again later.</p>"
        );
        console.error(err);
      },
    });
  }

  function displayProducts(perfumes) {
    const containers = $(".perfume-grid");
    console.log(containers[0]);
    $(containers[0]).empty();

    perfumes.forEach((perfume) => {
      const productHTML = `     
          <div class="perfume-item data-name="${perfume.name.toLowerCase()}">
            <img src="${perfume.image}" alt="${perfume.name}" />
            <h3>${perfume.name}</h3>
            <p>${perfume.description}</p>
          </div>
        
            `;
      $(containers[0]).append(productHTML);
    });
  }
  loadProducts();

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

  function updateCartCount() {
      $('#cart-count').text(cart.length);
  }

  setupNav();
  updateCartCount();
  $(window).resize(debounce(setupNav, 200));
});