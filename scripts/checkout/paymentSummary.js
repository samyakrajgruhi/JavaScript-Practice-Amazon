import{cart,calculateCartQuantity} from "../../data/cart.js"
import {products} from "../../data/products.js"
import {formatCurrency} from "../utils/money.js"
import { deliveryOptions } from "../../data/deliveryOptions.js";


export function renderPaymentSummary(){
    let totalItemCost = 0; // Total Item Cost without delivery charge or tax
    products.forEach((product)=>{
        cart.forEach((cartItem)=>{
            if(cartItem.productId === product.id){
                totalItemCost += (product.priceCents)*cartItem.quantity;
            } 
        });
    });

    let deliveryCharge = 0; // Total Delivery Charge
    deliveryOptions.forEach((option)=>{
        cart.forEach((cartItem)=>{
            if(cartItem.deliveryOptionId === option.id){
                deliveryCharge += option.priceCents;
            }
        });
    });
    
    let totalBeforeTax = totalItemCost + deliveryCharge; // Item cost + delivery Charge
    let tax  = totalBeforeTax * 0.1; // Tax (totalBeforeTax x 10%)
    
    let totalCost = totalBeforeTax + tax; // Final Cost of the Order
    const html = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Item(${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalItemCost)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(deliveryCharge)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money js-payment-tax">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-payment-total">$${formatCurrency(totalCost)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
    `

    document.querySelector('.js-payment-summary').innerHTML = html;

}