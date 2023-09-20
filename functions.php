<?php
// Connexion à la base de données
$serveur = "localhost";
$utilisateur = "root";
$mot_de_passe = "";
$base_de_donnees = "memory";

$connexion = new mysqli($serveur, $utilisateur, $mot_de_passe, $base_de_donnees);

if ($connexion->connect_error) {
    die("La connexion à la base de données a échoué : " . $connexion->connect_error);
}

// Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pseudo = $_POST["pseudo"];
    $action = $_POST["action"];

    if ($action === "ajouter") {
        // Ajouter le pseudo dans la base de données
        $sql = "INSERT INTO user (pseudo) VALUES ('$pseudo')";
        if ($connexion->query($sql) === TRUE) {
            echo "Pseudo ajouté avec succès.";
        } else {
            echo "Erreur lors de l'ajout du pseudo : " . $connexion->error;
        }
    }

    // Récupérer tous les pseudos de la base de données
    $result = $connexion->query("SELECT pseudo FROM user");
    $pseudos = [];
    while ($row = $result->fetch_assoc()) {
        $pseudos[] = $row["pseudo"];
    }
}
