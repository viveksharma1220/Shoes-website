document.addEventListener("DOMContentLoaded", function() {
    const content = document.querySelector('.content1');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.item');
            const itemName = item.querySelector('h2').innerText;
            const itemPrice = parseFloat(item.querySelector('p').innerText.replace('Price: $', ''));
            const quantity = parseInt(item.querySelector('input[type="number"]').value);

            addToCart(itemName, itemPrice, quantity);
        });
    });

    function addToCart(itemName, itemPrice, quantity) {
        const existingCartItem = document.querySelector(`.cart-item[data-name="${itemName}"]`);
        
        if (existingCartItem) {
            const existingQuantity = parseInt(existingCartItem.querySelector('.quantity').innerText.replace('Quantity: ', ''));
            existingCartItem.querySelector('.quantity').innerText = `Quantity: ${existingQuantity + quantity}`;
        } else {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.dataset.name = itemName;

            const totalPrice = 10 * quantity;

            cartItem.innerHTML = `
                <div class="item">
                    <img src="logo2.jpg" alt="Item 1">
                    <div class="item-details">
                        <h2>${itemName}</h2>
                        <p>Price: $${totalPrice.toFixed(2)}</p>
                        <p class="quantity">Quantity: ${quantity}</p>
                        <button class="remove-from-cart">Remove</button>
                    </div>
                </div>
            `;

            const removeButton = cartItem.querySelector('.remove-from-cart');
            removeButton.addEventListener('click', function() {
                cartItem.remove();
                updateLocalStorage();
            });

            content.appendChild(cartItem);
        }

        updateLocalStorage();
    }

    function updateLocalStorage() {
        const cartItems = document.querySelectorAll('.cart-item');
    
        const items = [];
    
        cartItems.forEach(item => {
            const itemName = item.querySelector('h2').innerText;
            const itemPrice = parseFloat(item.querySelector('p').innerText.replace('Price: $', ''));
            const quantity = parseInt(item.querySelector('.quantity').innerText.replace('Quantity: ', ''));
    
            items.push({
                name: itemName,
                price: itemPrice,
                quantity: quantity
            });
        });
    
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    function loadCartItems() {
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        storedItems.forEach(item => {
            addToCart(item.name, item.price, item.quantity);
        });
    }

    loadCartItems();
});