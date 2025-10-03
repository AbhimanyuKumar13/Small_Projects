let bagItems; 

onLoad();
function onLoad() {
  let bagItemstr = localStorage.getItem("bagItems");
  if (bagItemstr != null) {
    bagItems = JSON.parse(bagItemstr);
  } else {
    bagItems = [];
  } 
  displayBagIcon();
} 
function addToBag(itemId) {
  bagItems.push(String(itemId));
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
  // console.log(bagItems);
}
function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".cartItemsCount");
  if (bagItemCountElement){
    if (bagItems.length > 0) {
      bagItemCountElement.innerText = bagItems.length;
      bagItemCountElement.style.visibility = "visible";
    } else {
      bagItemCountElement.innerText = "";
      bagItemCountElement.style.visibility = "hidden";
    }
  } else {
    console.error('Element with class "cartItemsCount" not found in the DOM.');
  }
}
function displayItemsOnHomePage(containerClass, items) {
  let itemsContainer = document.querySelector(`.${containerClass}`);
  if (!itemsContainer) return;
  let innerHTML = "";
  items.forEach((item) => {
    innerHTML += `
      <div class="item">
        <img src="${item.image}" alt="${item.image_alt}">
        <div class="about">
          <h2>${item.name}</h2>
          <div class="price">
            <h2>Price: ${item.current_price}</h2>
            <h3>${item.original_price}</h3>
          </div>
          <div class="buttons">
            <img src="/assets/wishlist.svg" alt="wishlist" class="wishlist-icon" onclick="addToWishlist(${item.id})">
            <button onclick="addToBag(${item.id})">Add To Cart</button>
          </div>
        </div>
      </div>
    `;
  });
  itemsContainer.innerHTML = innerHTML;
}
 
// Example of calling the function
displayItemsOnHomePage('itemsContainer', items);

let hamFun = document.querySelector('.hamburger');
let invisible = document.querySelector('.invisible');
hamFun.addEventListener('click', () => { 
  invisible.classList.toggle('visible'); 
})
