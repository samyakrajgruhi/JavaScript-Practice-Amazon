import {cart,removeFromCart,calculateCartQuantity,saveToStorage} from "../data/cart.js"
import {products} from "../data/products.js"

function updateCartQuantity(){
  document.querySelector('.js-cart-quantity-home-link').innerHTML = `${calculateCartQuantity()} items`;
}

let productSummaryHTML = '';

products.forEach((product)=>{
    let matchingItem;
    cart.forEach((item)=>{
        if(product.id === item.productId){
            matchingItem = product;
            productSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${(matchingItem.priceCents /100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-${matchingItem.id}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link-${matchingItem.id} " data-update-item="${matchingItem.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingItem.id}">
                  <span class="link-primary save-link js-save-link-${matchingItem.id}" data-save-item="${matchingItem.id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
        }
    });
});
document.querySelector('.order-summary').innerHTML = productSummaryHTML;

updateCartQuantity();

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateCartQuantity();
  });
});



document.querySelectorAll('.update-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const updateItemId = link.dataset.updateItem;
    // Making the Input ELement and Save link appear //
    document.querySelector(`.js-save-link-${updateItemId}`).classList.add('is-editing');    
    document.querySelector(`.js-quantity-input-${updateItemId}`).classList.add('is-editing'); 
    // Making the current Quantity and Update link disappear //
    document.querySelector(`.js-quantity-${updateItemId}`).classList.add('is-updating');
    link.classList.add('is-updating');
  });
});

document.querySelectorAll('.save-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const saveItemId = link.dataset.saveItem;
    // Updating the Current Quantity //
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${saveItemId}`).value);
    cart.forEach((item)=>{
      if(item.productId === saveItemId){
        item.quantity = newQuantity;
        document.querySelector(`.js-quantity-${saveItemId}`).innerHTML = item.quantity;

        updateCartQuantity();
        saveToStorage();
      }
    });
    // Making the Input ELement and Save link disappear //
    document.querySelector(`.js-save-link-${saveItemId}`).classList.remove('is-editing');    
    document.querySelector(`.js-quantity-input-${saveItemId}`).classList.remove('is-editing'); 
    // Making the current Quantity and Update link appear //
    document.querySelector(`.js-quantity-${saveItemId}`).classList.remove('is-updating');
    document.querySelector(`.js-update-link-${saveItemId}`).classList.remove('is-updating');
  });
});

