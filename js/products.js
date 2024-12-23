$(document).ready(function() {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts'; 
    const images = [
        'images/t1.png',
        'images/t2.png',
        'images/t3.png',
        'images/t4.png',
        'images/t6.png',
        'images/t7.png',
        'images/per.png',
    ];
    let perfumes = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function showCustomAlert(message, type) {
        const alertBox = $('<div>').addClass('custom-alert').text(message);
        $('body').append(alertBox);
        setTimeout(() => alertBox.addClass('show'), 10);
        setTimeout(() => {
            alertBox.removeClass('show');
            setTimeout(() => alertBox.remove(), 500);
        }, 3000);
    }

    function loadProducts() {
        $.ajax({
            url: apiURL,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                
                perfumes = data.slice(0, 20).map(item => ({
                    id: item.id,
                    name: `Perfume ${item.id}`,
                    description: item.body.substring(0, 100) + '...',
                    price: (Math.random() * 100 + 50).toFixed(2),
                    image: images[(item.id - 1) % images.length] 
                }));

                displayProducts(perfumes);
            },
            error: function(err) {
                $('#products-container, #featured-products-container').html('<p>Failed to load products. Please try again later.</p>');
                console.error(err);
            }
        });
    }

    
    function displayProducts(perfumes) {
        const containers = $('#products-container, #featured-products-container');
        containers.empty();

        perfumes.forEach(perfume => {
            const productHTML = `
                <div class="perfume-item" data-name="${perfume.name.toLowerCase()}">
                    <img src="${perfume.image}" alt="${perfume.name}">
                    <h3>${perfume.name}</h3>
                    <p>${perfume.description}</p>
                    <p><strong>$${perfume.price}</strong></p>
                    <button class="add-to-cart" data-id="${perfume.id}">Add to Cart</button>
                </div>
            `;
            containers.append(productHTML);
        });
    }

    
    $('#search-bar').on('keyup', function() {
        const query = $(this).val().toLowerCase();
        $('.perfume-item').filter(function() {
            $(this).toggle($(this).attr('data-name').includes(query));
        });
    });

    
    function addToCart(perfume) {
        
        const existingItem = cart.find(item => item.id === perfume.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            perfume.quantity = 1;
            cart.push(perfume);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        showCustomAlert('Perfume added to cart!', 'success');
        updateCartCount(); 
    }

    
    $(document).on('click', '.add-to-cart', function() {
        const perfumeId = $(this).data('id');
        const perfume = perfumes.find(p => p.id == perfumeId); 

        if (perfume) {
            addToCart(perfume);
        }
    });

    
    function updateCartCount() {
        $('#cart-count').text(cart.length);
    }

    
    loadProducts();
    updateCartCount();
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
