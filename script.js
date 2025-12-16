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

        const div_sub_container = document.createElement("div");
        div_sub_container.classList.add("div_sub_container");

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
        
        div_sub_container.appendChild(pNom);
        div_sub_container.appendChild(pPrix);
        div_sub_container.appendChild(btnAjouter);

        div_container.appendChild(div_sub_container);

        // Ajout du produit au container principal
        produits_container.appendChild(div_container);
    });
}

// Fonction pour ajouter un produit au panier
const ajouterAuPanier = (produit) => {

    // Vérifie si le produit existe déjà
    const existe = panier.find(p => p.id === produit.id);

    if(existe) {
        // Si oui, augmente la quantité
        existe.quantite += 1;
    }
    else {
        // Sinon, ajoute le produit au panier
        panier.push({
            id: produit.id,
            nom: produit.nom,
            prix: produit.prix,
            quantite: 1
        });
    }

    // Met à jour l'affichage du panier
    afficherPanier();
}

// Supprime un produit du panier via son id
const supprimerDuPanier = (idProduit) => {
    panier = panier.filter(p => p.id !== idProduit);
    afficherPanier();
}

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

        const sousTotal = produit.prix * produit.quantite;
        // Ligne affichant le produit
        const ligne = document.createElement("p");
        ligne.textContent = `${produit.quantite} ${produit.nom} ${produit.prix} € total : ${sousTotal} €`;

        // Création du bouton Supprimer
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Supprimer";

        // Suppression au clic
        btnDelete.addEventListener("click", () => {
            supprimerDuPanier(produit.id);
        });
        
        // Ajout de la ligne et du bouton au DOM
        ligne.appendChild(btnDelete);
        panierListe.appendChild(ligne);

        // Ajout du prix au total
        total += produit.prix * produit.quantite;
    });

    // Affichage du total du panier
    montantTotal.textContent = total;
};

// Récupération des éléments
const btnCommande = document.getElementById("btn-commander");
const messageFeedback = document.getElementById("message-feedback");
const emailClient = document.getElementById("email-client");

// Gestion du clic sur le bouton "btn-commander"
btnCommande.addEventListener("click", () => {

    // Réinitialisation du message
    messageFeedback.textContent = "";
    messageFeedback.className = "";

    // Vérification si le panier est vide
    if(panier.length === 0) {
        messageFeedback.textContent = "Votre panier est vide";
        messageFeedback.classList.add("error");

        return;
    }

    // Regex pour validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Vérification email
    if(!emailRegex.test(emailClient.value.trim())) {
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