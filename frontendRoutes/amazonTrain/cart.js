let existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];
console.log(existingItems);

if (!Array.isArray(existingItems)) {
    existingItems = [];
}

const cartNumber = document.querySelector('#cartNb');
cartNumber.innerText = existingItems.reduce((total, item) => {
    return total + item.quantity;
}, 0);


const finalPrice = document.querySelector('#finalPrice');
let calculateFinalPrice = existingItems.reduce((total, item) => {
    return total + (item.priceCents * item.quantity);
}, 0);
finalPrice.innerText = `${(calculateFinalPrice / 100).toFixed(2)} $`;

///////////////////////////////////////////////////////////////////////

const productsDisplay = document.querySelector('#productsDisplay');

let productsHtml = '';

existingItems.forEach(product => {
    productsHtml += `
        <div class="oneProductInCart" data-name='${product.pdName}' data-image='${product.image}' data-price-cents='${product.priceCents}'>
            <div class="productImgDiv">
                <img class="productImg" src="${product.image}" alt="productIMG">
            </div>
            <p class="productName">${product.pdName}</p>
            <p class="productPrice">${(product.priceCents / 100).toFixed(2)}$</p>
            <div class='removeBtnAndQuantityDiv'>
                <button class="removeItemBtn" id="removeItemBtn">Remove</button>
                <p class='productQuantity'>Quantity: ${product.quantity}</p>
            </div>
        </div>
    `;
});

productsDisplay.innerHTML = productsHtml || "<p class='noItemsMessage'>Vous n'avez aucun produit dans votre cadis.</p>";

///////////////////////////////////////////////////////////////////////

const removeBtns = document.querySelectorAll('#removeItemBtn');

removeBtns.forEach(removeBtn => {
    removeBtn.addEventListener('click', (event) => {
        const productDiv = event.target.closest('.oneProductInCart');

        const productImage = productDiv.dataset.image;
        const productName = productDiv.dataset.name;
        const productPrice = productDiv.dataset.priceCents;

        existingItems = existingItems.filter(item => 
            item.image !== productImage || 
            item.pdName !== productName || 
            item.priceCents !== productPrice
        );

        localStorage.setItem('cartItems', JSON.stringify(existingItems));


        const newCartNumber = existingItems.reduce((total, item) => total + item.quantity, 0);
        cartNumber.innerText = newCartNumber;


        let calculateFinalPrice = existingItems.reduce((total, item) => {
            return total + (item.priceCents * item.quantity);
        }, 0);
        finalPrice.innerText = `${(calculateFinalPrice / 100).toFixed(2)} $`;


        productDiv.remove();
    });
});

///////////////////////////////////////////////////////////////////////////

const amazonLogo = document.querySelector('#amazonLogo');

amazonLogo.addEventListener('click', () => {
    window.location.href = 'amazonMenu.html';
});
