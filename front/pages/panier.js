let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

//console.log(productInLocalStorage);
const displayArea = document.querySelector(".cart-product__container");

function displayArticleInLocalStorage() {
  for (i = 0; i < productInLocalStorage.length; i++) {
    displayArea.innerHTML += `
      <div class="cart-product">
          <div class="cart-product__name">${
            productInLocalStorage[i].teddyName
          }</div>
          <div class="cart-product__couleur">${
            productInLocalStorage[i].teddyColor
          }</div>
          <div class="cart-product__prix">${
            productInLocalStorage[i].teddyPrice / 100
          }€</div>
          <div class="cart-product__delete"><button class="delete" id="delete${[
            i,
          ]}">Supprimer l'article</button></div>
        </div>`;
  }
}

function checkProductInLocalStorage() {
  if (productInLocalStorage.length === 0) {
    console.log("le panier est vide");
    displayArea.innerHTML = `<p class="empty-cart">Votre panier est vide<br/>
        <a href="../index.html" title="Revenir à l'accueil">Revenir à l'accueil</a></p>`;
  } else {
    console.log("le panier est rempli");
    displayArticleInLocalStorage();
    document.querySelector('.delete-cart').innerHTML = '<button class="delete-all__btn">Vider le panier</button>';
    displayForm();
  }
}

function cart() {
  checkProductInLocalStorage();
}

cart();


// Fonction pour supprimer du panier
function suppr() {
  for (let k = 0; k < productInLocalStorage.length; k++) {
    document.querySelector(`#delete${[k]}`).addEventListener(
      "click",
      (ev) => {
        productInLocalStorage.splice([k], 1);
        console.log(productInLocalStorage);
        localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
        document.location.reload();
      },
      false
    );
  }
}

suppr();


//Faire le total des éléments du panier
function total() {
  let sum = 0
for (let l = 0; l < productInLocalStorage.length; l++) {
  sum = sum + productInLocalStorage[l].teddyPrice;
  document.querySelector('.total').innerHTML = `<p>Total de votre commande: ${sum/100}€</p>`
}}

total();

const deleteCartButton = document.querySelector('.delete-cart');

function deleteCart() {
  let l = productInLocalStorage.length;
  console.log(l);
    deleteCartButton.addEventListener(
      "click",
      (ev) => {
        productInLocalStorage.splice(0, [l]);
        console.log(productInLocalStorage);
        localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
        document.location.reload();
      },
      false
    );
  }


deleteCart()

function displayForm() {
  document.querySelector('#cart-form').innerHTML = `<form id="contact-information">
  <p>Félicitations, votre commande est presque prête ! Il ne vous reste plus qu'à nous dire où l'envoyer.</p>
    
  <fieldset>
    <legend>Votre identité</legend>
  <label for="firstname">Votre Prénom</label>
    <input type="text" id="firstname" pattern="[a-zA-Z-]*" minlength="1"  required/>
    <label for="lastname" >Votre nom</label>
    <input type="text" id="lastname"  minlength="1" pattern="[a-zA-Z-]*" required/>
    </fieldset>
    <fieldset>
        <legend>Votre adresse</legend>
    <label for="number">N°</label>
    <input type="number" min="0" id="number" onkeydown="return event.keyCode !== 69 && event.keyCode !== 109 && event.keyCode !== 107 && event.keyCode !== 190 && event.keyCode !== 110"/>
    <label for="voie">Voie</label>
    <input type="voie" id="voie"  required/>
    <label for="city">Ville</label>
    <input type="city" id="city"  required/>
  </fieldset>


  <fieldset>
    <legend>Information supplémentaire</legend>
  <label for="email">Votre adresse mail</label>
  <input type="email" id="email" required/>
</fieldset>
  
    <input type="submit" value="Envoyer" />
  
</form>`;
}




async function sendOrder() {
fetch(": http://localhost:3000/get/", {
	method: "POST",
	headers: { 
'Accept': 'application/json', 
'Content-Type': 'application/json' 
},
	body: JSON.stringify(order)
});
}

document.querySelector('#contact-information').addEventListener("submit", (e) => {
      
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const number = document.getElementById('number').value;
  const voie = document.getElementById('voie').value;
  const city = document.getElementById('city').value;
  const mail = document.getElementById('email').value;

  console.log(firstname);
  console.log("Commande envoyée dans l'espace");
  e.preventDefault(); 
}, false);

function verifyForm() {

}