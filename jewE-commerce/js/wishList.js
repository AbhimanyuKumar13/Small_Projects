let wishlistItems = [];

function onLoadWishlist() {
  let wishlistItemStr = localStorage.getItem("wishlistItems");
  if (wishlistItemStr != null) {
    wishlistItems = JSON.parse(wishlistItemStr);
  } else {
    wishlistItems = []; 
  }
  displayWishlistIcon();
  displayWishlistItems(); 
}

function addToWishlist(itemId) {
  const wishlistIcon = document.querySelector(`.wishlist-icon[data-id="${itemId}"]`);
  
  if (!wishlistItems.includes(String(itemId))) {
    wishlistItems.push(String(itemId));
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    displayWishlistIcon();
    console.log("Item added to wishlist!");
    
    // Add filled class
    if (wishlistIcon) {
      wishlistIcon.classList.add('filled');
    }
  } else {
    console.log("Item is already in your wishlist.");
  }
}

function displayWishlistIcon() {
  let wishlistItemCountElement = document.querySelector(".wishListItemsCount");
  if (wishlistItemCountElement) {
    if (wishlistItems.length > 0) {
      wishlistItemCountElement.innerText = wishlistItems.length;
      wishlistItemCountElement.style.visibility = "visible";
    } else {
      wishlistItemCountElement.innerText = "";
      wishlistItemCountElement.style.visibility = "hidden";
    }
  } else {
    console.error('Element with class "wishListItemsCount" not found in the DOM.');
  }
}

function displayWishlistItems() {
  let wishlistContainer = document.querySelector(".wishlistItems");
  if (!wishlistContainer) {
    console.error('Element with class "wishlistItems" not found in the DOM.');
    return; // Exit the function if the element is not found
  }
  let innerHTML = ""; 
  wishlistItems.forEach((itemId) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      innerHTML += `
        <div class="wishitem item">
          <img src="${item.image}" alt="${item.image_alt}">
          <div class="wishabout about">
            <h2>${item.name}</h2>
            <div class="wishprice price">
              <h2>Price: ${item.current_price}</h2>
              <h3>${item.original_price}</h3>
            </div>
          </div>
          <div class="wishbuttons">
          <button class="wishbuttonsbuy" onclick="(${item.id})">Buy Now</button>
          <button class="wishbuttonsdelete" onclick="removeFromWishlist(${item.id})">Remove</button>
          </div>
        </div>
      `;
    }
  });
  wishlistContainer.innerHTML = innerHTML;
}

function removeFromWishlist(itemId) {
  const wishlistIcon = document.querySelector(`.wishlist-icon[data-id="${itemId}"]`);
  
  wishlistItems = wishlistItems.filter((id) => id !== String(itemId));
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  displayWishlistItems();
  displayWishlistIcon();
  
  // Remove filled class
  if (wishlistIcon) {
    wishlistIcon.classList.remove('filled');
  }
}

// Call onLoadWishlist when the page loads
onLoadWishlist();