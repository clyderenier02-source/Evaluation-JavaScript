const produits = [
    { id: 1, nom: "Thé Vert Bio", prix: 12.99, image: "https://placehold.co/150" },
    { id: 2, nom: "Café Arabica", prix: 8.50, image: "https://placehold.co/150" },
    { id: 3, nom: "Infusion Menthe", prix: 5.00, image: "https://placehold.co/150" },
    { id: 4, nom: "Chocolat Chaud", prix: 15.00, image: "https://placehold.co/150" }
];

// Tableau qui contiendra les produits ajoutés au panier
let pannier = [];

// Récupération du container HTML où seront affichés les produits
const produits_container = document.getElementById("produits-container");

// Fonction qui affiche les produits dans le DOM
const affichageProduits = (produits) => {

    // Vide le container avant de réafficher
    produits_container.innerHTML = "";

     // Boucle sur chaque produit du tableau
    produits.forEach(produit => {

        // Création de la div principale du produit
        const div_container = document.createElement("div");
        div_container.classList.add("produit");

        // Div pour contenir l’image
        const div_img = document.createElement("div");
        div_img.classList.add("div_img");

        // Affichage de l'id du produit
        const id = document.createElement("p");
        id.textContent = produit.id;

        // Nom du produit
        const pNom = document.createElement("h3");
        pNom.textContent = produit.nom;

        // Prix du produit
        const pPrix = document.createElement("p");
        pPrix.textContent = produit.prix + "€";

        // Image du produit
        const img = document.createElement("img");
        img.src = produit.image;
        img.alt = "image";

        // Création du bouton au panier
        const btnAjouter = document.createElement("button");
        btnAjouter.textContent = "Ajouter au panier";

        btnAjouter.addEventListener("click", () => {
            ajouterAuPanier(produit);
        });

        // Construction de la carte produit
        div_img.appendChild(img);
        div_container.appendChild(div_img);
        div_container.appendChild(id);
        div_container.appendChild(pNom);
        div_container.appendChild(pPrix);
        div_container.appendChild(btnAjouter)

        // Ajout du produit au container principal
        produits_container.appendChild(div_container);
    });
}

// Fonction pour ajouter un produit au panier
const ajouterAuPanier = (produit) => {

    // Vérifie si le produit existe déjà dans le panier
    const existe = pannier.find(p => p.id === produit.id);

    // Si le produit n'existe pas, on l'ajoute
    if(!existe) {
        pannier.push(produit);
        afficherPanier();
    }
};

// Récupération des éléments HTML du panier
const panier_liste = document.getElementById("panier-liste");
const montant_total = document.getElementById("montant-total");

// Fonction pour afficher le contenu du panier
const afficherPanier = () => {

    // Vide la liste du panier
    panier_liste.innerHTML = "";

    // Si le panier est vide
    if(pannier.length === 0) {
        panier_liste.innerHTML = "<p>Votre panier est vide.</p>";
        montant_total.textContent = "0.00 €";

        return;
    }
    
    let total = 0;

    // Parcourt les produits du panier
    pannier.forEach(produit => {

        // Ligne affichant le produit
        const ligne = document.createElement("p");
        ligne.textContent = produit.nom + " " + produit.prix + " €";

        // Bouton supprimer
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Supprimer";

        btnDelete.addEventListener("click", () => {
            supprimerDuPanier(produit.id);
        });
        
        // Ajout au DOM
        panier_liste.appendChild(ligne);
        panier_liste.appendChild(btnDelete);

        // Calcul du total
        total += produit.prix;
    });
    // Affichage du total
    montant_total.textContent = total;
};

const supprimerDuPanier = (idProduit) => {
    pannier = pannier.filter(produit => produit.id !== idProduit);
    afficherPanier();
};

const btnCommande = document.getElementById("btn-commander");
const messageFeedback = document.getElementById("message-feedback");
const input = document.getElementById("email-client");




// Affiche les produits au chargement de la page
affichageProduits(produits);