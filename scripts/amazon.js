import {cart,addToCart,calculateCartQuantity} from "../data/cart.js"
import {products,loadProducts} from "../data/products.js";

loadProducts(renderProductsGrid);

function renderProductsGrid(){
    let productsHTML = '';

    products.forEach((product)=>{
        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getRating()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                ${product.extraInfoHTML()}

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
    });

    document.querySelector('.products-grid').innerHTML = productsHTML;

    function displayAddedMessage(productId){
        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        addedMessage.classList.add('added-to-cart-visible');

        setTimeout(()=>{
            const prevTimeoutId = addedMessageTimeouts[productId];

            if(prevTimeoutId){
                clearTimeout(prevTimeoutId);
            }

            const timoutId = setTimeout(() => {
                addedMessage.classList.remove('added-to-cart-visible');
            }, 2000);
            addedMessageTimeouts[productId] = timoutId;
        }); 
    }

    function updateCartQuantity(){
        if(calculateCartQuantity()!==0){
            document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity(); 
        }
        
    }

    const addedMessageTimeouts = {};
    updateCartQuantity()

    document.querySelectorAll('.js-add-to-cart-button').forEach((button) =>{
        button.addEventListener('click',()=>{
            const { productId } = button.dataset;
            const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
            addToCart(productId,quantity);
            updateCartQuantity()
            displayAddedMessage(productId);      
        });
    });
}