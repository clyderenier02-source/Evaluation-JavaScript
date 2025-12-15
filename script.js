const produits = [
    { id: 1, nom: "Thé Vert Bio", prix: 12.99, image: "https://placehold.co/150" },
    { id: 2, nom: "Café Arabica", prix: 8.50, image: "https://placehold.co/150" },
    { id: 3, nom: "Infusion Menthe", prix: 5.00, image: "https://placehold.co/150" },
    { id: 4, nom: "Chocolat Chaud", prix: 15.00, image: "https://placehold.co/150" }
];

const produits_container = document.getElementById("produits-container");

const affichageProduits = (produits) => {
    produits_container.innerHTML = "";

    produits.forEach(produit => {
        const div_container = document.createElement("div");
        div_container.classList.add("produit");

        const div_img = document.createElement("div");
        div_img.classList.add("div_img");

        const id = document.createElement("p");
        id.textContent = produit.id;

        const pNom = document.createElement("p");
        pNom.textContent = produit.nom;

        const pPrix = document.createElement("p");
        pPrix.textContent = produit.prix;

        const img = document.createElement("img");
        img.src = produit.image;
        img.alt = "image";

        div_img.appendChild(img);
        div_container.appendChild(div_img);
        div_container.appendChild(id);
        div_container.appendChild(pNom);
        div_container.appendChild(pPrix);
        produits_container.appendChild(div_container);
    });
}

affichageProduits(produits);