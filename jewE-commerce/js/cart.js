let bagItemsObjects;
const CONVENIENCE_FEE = 99;
onLoad(); 

function onLoad() {
  loadBagItemsObjects();
  displayBagItems();
  displayBagIcon();
  displayBagSummary();
}

function generateHtmlElements(item) {
  if (!item) return "";
  return `
    <div class="cartItem">
      <div class="cartImage">
        <img src="${item.image}" alt="${item.image_alt}">
      </div>
      <div class="attribute">
        <h1>${item.name}</h1>
        <p>Price: <span class="currPriceCart">${item.current_price}</span> <span class="oriPriceCart">${item.original_price}</span></p>
        <h3>Arriving in 3 days</h3>
        <button class="buyNow">Buy Now</button>
        <button class="deleteCartItem" onClick="removeFromBag(${item.id})">Remove</button>
      </div>
    </div>
  `;
}
function loadBagItemsObjects() {
  bagItemsObjects = bagItems.map((itemId) => {
    const item = items.find((item) => item.id === String(itemId)); // Ensure comparison is done as strings
    if (!item) {
      console.warn(`Item with ID ${itemId} not found`); // Log a warning if the item is not found
    }
    return item; // This may return undefined if the item is not found
  }).filter(item => item !== undefined); // Filter out undefined items
}
function displayBagItems() {
  let containerElement = document.querySelector(".cartItems");
  let innerHTML = "";
  bagItemsObjects.forEach((bagItem) => {
    innerHTML += generateHtmlElements(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}
function removeFromBag(itemId) {
  console.log("Removing item with ID:", itemId); // Log the ID being removed
  console.log("Current bagItems before removal:", bagItems); // Log current bagItems
  
  // Ensure both IDs are treated as strings for comparison
  bagItems = bagItems.filter((bagItemId) => {
    console.log("Comparing:", bagItemId, "with", itemId); // Log each comparison
    return String(bagItemId) !== String(itemId);
  });
  
  console.log("Updated bagItems after removal:", bagItems); // Log updated bagItems
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemsObjects();
  displayBagItems();
  displayBagIcon();
  displayBagSummary(); 
}
function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".Pricing");
  let totalItem = bagItemsObjects.length;
  let totalMrp = 0;
  let totalDiscount = 0;

  bagItemsObjects.forEach(bagItem => {
    if (bagItem) { // Check if bagItem is defined
      totalMrp += bagItem.original_price;
      totalDiscount += bagItem.original_price - bagItem.current_price;
    }
  });

  let finalPayment = totalMrp - totalDiscount + CONVENIENCE_FEE;
  bagSummaryElement.innerHTML = `
     <div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
          <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">₹${totalMrp}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹ 99</span>
          </div>
          <hr>
          <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹ ${finalPayment}</span>
          </div>
        </div>
        <button class="btn-place-order"> PLACE ORDER 
        </button
  `;
}