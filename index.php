<!DOCTYPE html>
<html>

<head>
    <title>Formulaire</title>
</head>

<body>
    <?php
    // Connexion à la base de données
    $serveur = "localhost";
    $utilisateur = "root";
    $mot_de_passe = "";
    $base_de_donnees = "memory";

    $connexion = new mysqli($serveur, $utilisateur, $mot_de_passe, $base_de_donnees);

    // Vérifier la connexion
    if ($connexion->connect_error) {
        echo '<div class="message-erreur">La connexion à la base de données a échoué : ' . $connexion->connect_error . '</div>';
    } else {
        // La connexion à la base de données est réussie, affichez la div
        echo '<div class="ma-div">La connexion a réussit</div>';
    }
    ?>
</body>

</html>