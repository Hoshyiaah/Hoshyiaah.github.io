const products = [
    {image: 'amazonImgs/cap.png', pdName: 'Leather Cap', priceCents: 4608},
    {image: 'amazonImgs/dumbells.png', pdName: 'Metal Dumbells', priceCents: 8873},
    {image: 'amazonImgs/pc.png', pdName: 'Portable PC', priceCents: 23642},
    {image: 'amazonImgs/shoes.png', pdName: 'Sport Shoes', priceCents: 10712},
    {image: 'amazonImgs/sunglasses.png', pdName: 'Super Sunglasses', priceCents: 1845},
    {image: 'amazonImgs/tshirt.png', pdName: 'Cotton Tshirt', priceCents: 2299},
];

const productContainer = document.querySelector('#productsContainer');

let productsHtml = '';

products.forEach(product => {
    productsHtml += `
        <div class="oneProductContainer" data-name='${product.pdName}' data-image='${product.image}' data-price-cents='${product.priceCents}'>
            <div class="productImgDiv">
                <img class="productImg" src="${product.image}" alt="productIMG">
            </div>
            <p class="productName">${product.pdName}</p>
            <p class="productPrice">${(product.priceCents / 100).toFixed(2)}$</p>
            <button class="addToCartBtn" id="addToCartBtn">Add To Cart</button>
        </div>
    `;
});

productContainer.innerHTML = productsHtml;

/////////////////////////////////////////////////////////////////////////

let existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];
console.log(existingItems);

if (!Array.isArray(existingItems)) {
    existingItems = [];
}

const cartNumber = document.querySelector('#cartNb');
cartNumber.innerText = existingItems.reduce((total, item) => {
    return total + item.quantity;
}, 0);

const addToCartBtns = document.querySelectorAll('#addToCartBtn');
addToCartBtns.forEach(button => {
    button.addEventListener('click', (event) => {
        const productDiv = event.target.closest('.oneProductContainer');

        const productImage = productDiv.dataset.image;
        const productName = productDiv.dataset.name;
        const productPrice = productDiv.dataset.priceCents;

        const infoSelectedProduct = {
            image: productImage, 
            pdName: productName, 
            priceCents: productPrice,
            quantity: 1 // Initialiser la quantité à 1
        };

        // Vérifier si le produit existe déjà dans le panier
        const existingProduct = existingItems.find(item => 
            item.image === infoSelectedProduct.image && item.pdName === infoSelectedProduct.pdName && item.priceCents === infoSelectedProduct.priceCents
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            existingItems.push(infoSelectedProduct);
        }

        localStorage.setItem('cartItems', JSON.stringify(existingItems));

        cartNumber.innerText = existingItems.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    });
});

///////////////////////////////////////////////////////////////////////////

const cartLogo = document.querySelector('#cartImg');

cartLogo.addEventListener('click', () => {
    window.location.href = 'amazonCart.html';
});