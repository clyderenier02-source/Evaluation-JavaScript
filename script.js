const produits = [
    { id: 1, nom: "Thé Vert Bio", prix: 12.99, image: "https://placehold.co/150" },
    { id: 2, nom: "Café Arabica", prix: 8.50, image: "https://placehold.co/150" },
    { id: 3, nom: "Infusion Menthe", prix: 5.00, image: "https://placehold.co/150" },
    { id: 4, nom: "Chocolat Chaud", prix: 15.00, image: "https://placehold.co/150" }
];

// Tableau qui contiendra les produits ajoutés au panier
let panier = [];

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

        // Ajout du produit au panier au clic
        btnAjouter.addEventListener("click", () => {
            ajouterAuPanier(produit);
        });

        // Construction de la carte produit
        div_img.appendChild(img);
        div_container.appendChild(div_img);
        
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
    const existe = panier.find(p => p.id === produit.id);

    // Si le produit n'existe pas, on l'ajoute
    if(!existe) {
        panier.push(produit);
        afficherPanier();
    }
};

// Récupération des éléments HTML du panier
const panierListe = document.getElementById("panier-liste");
const montantTotal = document.getElementById("montant-total");

// Fonction pour afficher le contenu du panier
const afficherPanier = () => {

    // Vide la liste du panier
    panierListe.innerHTML = "";

    // Si le panier est vide
    if(panier.length === 0) {
        panierListe.innerHTML = "<p>Votre panier est vide.</p>";
        montantTotal.textContent = "0.00 €";

        return;
    }
    
    let total = 0;

    // Parcourt les produits du panier
    panier.forEach(produit => {

        // Ligne affichant le produit
        const ligne = document.createElement("p");
        ligne.textContent = produit.nom + " " + produit.prix + " €";

        // Création du bouton Supprimer
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Supprimer";

        // Suppression du produit au clic
        btnDelete.addEventListener("click", () => {
            supprimerDuPanier(produit.id);
        });
        
        // Ajout de la ligne et du bouton au DOM
        panierListe.appendChild(ligne);
        panierListe.appendChild(btnDelete);

        // Ajout du prix au total
        total += produit.prix;
    });

    // Affichage du total du panier
    montantTotal.textContent = total;
};

// Fonction pour supprimer un produit du panier
const supprimerDuPanier = (idProduit) => {

    // Supprime le produit du tableau panier
    panier = panier.filter(produit => produit.id !== idProduit);

    // Réaffiche le panier mis à jour
    afficherPanier();
};

// Validation de la commande
const btnCommande = document.getElementById("btn-commander");
const messageFeedback = document.getElementById("message-feedback");
const input = document.getElementById("email-client");

// Gestion du clic sur le bouton "Passer la commande"
btnCommande.addEventListener("click", () => {

    // Réinitialisation du message
    messageFeedback.textContent = "";
    messageFeedback.className = "";

    // Vérification si le panier est vid
    if(panier.length === 0) {
        messageFeedback.textContent = "Votre panier est vide";
        messageFeedback.classList.add("error");

        return;
    }

    // Récupération et validation de l'email
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)) {
        messageFeedback.textContent = "Veuillez entrer une adresse valide.";
        messageFeedback.classList.add("error");

        return;
    }

     // Message de succès
    messageFeedback.textContent = "Commande validée.";
    messageFeedback.classList.add("success");

    // Vide le panier après commande
    panier = [];

    // Met à jour l'affichage du panier
    afficherPanier();
});


// Affiche les produits au chargement de la page
affichageProduits(produits);