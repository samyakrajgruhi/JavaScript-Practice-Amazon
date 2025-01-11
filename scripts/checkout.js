import {cart,removeFromCart,calculateCartQuantity,saveToStorage,toChangeDeliveryDate} from "../data/cart.js"
import {products} from "../data/products.js"
import daysjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {deliveryOptions} from "../data/deliveryOptions.js"


function updateCartQuantity(){
  document.querySelector('.js-cart-quantity-home-link').innerHTML = `${calculateCartQuantity()} items`;
}
function renderProductSummary(){
  let productSummaryHTML = '';

  products.forEach((product)=>{
      let matchingItem;
      
      cart.forEach((item)=>{
        let deliveryOption;
        deliveryOptions.forEach((option)=>{
          if(option.id === item.deliveryOptionId){
            deliveryOption = option;
          }
        });
        let today = daysjs();
        const dateString = today.add(deliveryOption.days,'days').format('dddd, MMMM D');

<<<<<<< HEAD
        if(product.id === item.productId){
=======
        
        if(product.id === item.productId){          
>>>>>>> b788245a733cc3cc9ccbdb6a0f971fbb81349ca5
            matchingItem = product;
            productSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                ${deliveryOptionHTML(matchingItem.id,item.deliveryOptionId)}
              </div>
            </div>
          </div>
          `;
        }
      }); 
  });

  // Putting all HTML code on the page //
  document.querySelector('.order-summary').innerHTML = productSummaryHTML;

  // update cart quantity //
  updateCartQuantity();
<<<<<<< HEAD

  // Code to delete an item from cart //
  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCartQuantity();
    });
  });


  // Update the Quantity on page //
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
      if( (newQuantity % 1 !== 0) || newQuantity <= 0){
        alert('Invalid quantity input.');
      }else{
        cart.forEach((item)=>{
          if(item.productId === saveItemId){
            item.quantity = newQuantity;
            document.querySelector(`.js-quantity-${saveItemId}`).innerHTML = item.quantity;

            updateCartQuantity();
            saveToStorage();
          }
        });
      }
      // Making the Input ELement and Save link disappear //
      document.querySelector(`.js-save-link-${saveItemId}`).classList.remove('is-editing');    
      document.querySelector(`.js-quantity-input-${saveItemId}`).classList.remove('is-editing'); 
      // Making the current Quantity and Update link appear //
      document.querySelector(`.js-quantity-${saveItemId}`).classList.remove('is-updating');
      document.querySelector(`.js-update-link-${saveItemId}`).classList.remove('is-updating');
    });
  });

  // Event listener for Delivery Dates //

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryId} = element.dataset;
      toChangeDeliveryDate(productId,deliveryId);
      renderProductSummary();
    });
  });

=======
  
  // Add this line to attach listeners after rendering
  attachDeliveryOptionListeners();
>>>>>>> b788245a733cc3cc9ccbdb6a0f971fbb81349ca5
}


// Delivery date and rate display //
function deliveryOptionHTML(productId,deliveryId){
  let today = daysjs();
  let html = '';
  
  deliveryOptions.forEach((deliveryOption)=>{
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${(deliveryOption.priceCents / 100).toFixed(2)}`;
    const dateString = today.add(deliveryOption.days,'days').format('dddd, MMMM D');
    html+= 
    `<div class="delivery-option">
        <input type="radio" 
          class="delivery-option-input js-delivery-option"
          name="delivery-option-${productId}" 
          ${(deliveryOption.id === deliveryId) ? 'checked' :''}
          data-product-id="${productId}",
          data-delivery-id="${deliveryOption.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `
  });
  return html;
}

renderProductSummary();


<<<<<<< HEAD
=======

// Update the Quantity on page //
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
    if( (newQuantity % 1 !== 0) || newQuantity <= 0){
      alert('Invalid quantity input.');
    }else{
      cart.forEach((item)=>{
        if(item.productId === saveItemId){
          item.quantity = newQuantity;
          document.querySelector(`.js-quantity-${saveItemId}`).innerHTML = item.quantity;

          updateCartQuantity();
          saveToStorage();
        }
      });
    }
    // Making the Input ELement and Save link disappear //
    document.querySelector(`.js-save-link-${saveItemId}`).classList.remove('is-editing');    
    document.querySelector(`.js-quantity-input-${saveItemId}`).classList.remove('is-editing'); 
    // Making the current Quantity and Update link appear //
    document.querySelector(`.js-quantity-${saveItemId}`).classList.remove('is-updating');
    document.querySelector(`.js-update-link-${saveItemId}`).classList.remove('is-updating');
  });
});

// Add this function to checkout.js
function attachDeliveryOptionListeners() {
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryId} = element.dataset;
      toChangeDeliveryDate(productId, deliveryId);
      renderProductSummary();
      // Re-attach event listeners to the new elements
      attachDeliveryOptionListeners();
    });
  });
}
>>>>>>> b788245a733cc3cc9ccbdb6a0f971fbb81349ca5
