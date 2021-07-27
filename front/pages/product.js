let params = new URL(document.location).searchParams;
let justId = params.get("id");
let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

console.log(justId);

const selectForm = document.querySelector("#couleur");
const zoneAffichage = document.getElementById("thearticle-container");
const formProduct = document.querySelector("#form-for-product");

// récupérer les infos en fonction de l'id
function getTheTeddy() {
  return fetch(`http://localhost:3000/api/teddies/${justId}`)
    .then(function (res) {
      console.log("ok");
      return res.json();
    })
    .then(function (teddy) {
      //console.log(theArticle);
      return teddy;
    })
    .catch(function (error) {
      console.log("error in function getTheArticle");
    });
}

async function main() {
  //fonction pour avoir tout les oursons dans le tableau donné dans getTeddies
  const teddy = await getTheTeddy();

  const colors = teddy.colors;

  displaytheArticle(teddy);

  for (color of colors) {
    addOption(color);
  }

  goToBasket();
}

function displaytheArticle(teddy) {
  zoneAffichage.innerHTML = `
    <div class="thearticle__image">
      <img src="${teddy.imageUrl}" alt="Image de l'ours ${teddy.name}"/>
    </div>
    <div class="thearticle__content">
      <div class="thearticle__name">
        <h1>${teddy.name}</h1>
      </div>
      <div class="thearticle__description">"${teddy.description}"</div>
      <div class="thearticle__price">${teddy.price / 100}<sup>€</sup></div>
    </div>
    `;
}

function addOption() {
  selectForm.add(new Option(`${color}`, `${color}`));
}

async function goToBasket() {
  const teddy = await getTheTeddy();

  // Définition d'un article
  let product = {
    teddyName: teddy.name,
    teddyId: teddy._id,
    teddyColor: "",
    teddyPrice: teddy.price,
  };

  // Ecoute de la couleur
  selectForm.addEventListener("change", (e) => {
    product.teddyColor = e.target.value;
    console.log(productInLocalStorage);
  });

  // Comment continuer après avoir choisi un produit
function howContinue() {
  const modal = document.querySelector('.window-confirmation');
  modal.style.display= 'flex';
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true')
  document.querySelector('.window-confirmation__resume').innerHTML= `L'article: <span class="classic">${teddy.name}</span> <br/>  
  Couleur: <span class="classic">${product.teddyColor}</span><br/>
          a été ajouté au panier.`
};

  document
    .querySelector("#window-confirmation__btn-cart")
    .addEventListener("click", (e) => {
      window.location.href = "panier.html";
    });
  document
    .querySelector("#window-confirmation__btn-continue")
    .addEventListener("click", (e) => {
      document.location.reload();
    });

  let productInLocalStorage = JSON.parse(localStorage.getItem("produit"));

  function checkLocalStorage() {
    //s'il y a déjà quelque chose
    if (productInLocalStorage) {
      productInLocalStorage.push(product);
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
      console.log(productInLocalStorage);
      console.log(product);
      howContinue()
    }
    //s'il n'y a rien
    else {
      productInLocalStorage = [];
      productInLocalStorage.push(product);
      console.log(productInLocalStorage);
      localStorage.setItem("produit", JSON.stringify(productInLocalStorage));
      howContinue();
    }
  }

  formProduct.addEventListener(
    "submit",
    (e) => {
      if (
        product.teddyColor == "" ||
        product.teddyColor == "Selectionner une couleur"
      ) {
        alert("N'oubliez pas de choisir une couleur pour votre ourson.");
        e.preventDefault();
      } else {
        e.preventDefault();
        checkLocalStorage();
      }
    },
    false
  );
}

main();

function numberProductInLocalStorage() {
  if (
    localStorage.getItem("produit") === null ||
    productInLocalStorage.length == 0
  ) {
    console.log("0");
  } else {
    nb = 0;
    for (let m = 0; m < productInLocalStorage.length; m++) {
      nb++;
    }
    document.querySelector(".number-cart").style.right = "32px";
    if(nb > 9) {document.querySelector(".number-cart").style.right = "29px";};
    document.querySelector(".number-cart").innerText = `${nb}`;
  }
}

numberProductInLocalStorage();

