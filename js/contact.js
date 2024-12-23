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