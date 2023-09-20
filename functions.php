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


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["player_count"])) {
        $playerCount = $_POST["player_count"];

        // Générer le formulaire en fonction du nombre de joueurs
        echo '<form method="post" action="functions.php">';
        for ($i = 1; $i <= $playerCount; $i++) {
            echo '<label for="player_' . $i . '">Joueur ' . $i . ' : </label>';
            echo '<input type="text" name="pseudo' . $i . '" id="pseudo' . $i . '" required><br>';
        }
        echo '<input type="submit" value="Start">';
        echo '</form>';
    }
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["mode"])) {
        $mode = $_POST["mode"];
        if ($mode === "solo") {
            // Générer le formulaire solo
            echo '<h2>Votre pseudo</h2>';
            echo '<form method="post" action="functions.php">';
            echo '<label for="pseudo">Votre pseudo : </label>';
            echo '<input type="text" name="pseudo" id="pseudo" required><br>';
            echo '<input type="submit" value="Start">';
            echo '</form>';
        } elseif ($mode === "multi") {
            // Générer le formulaire multi
            echo '<h2>Choix du nombre de joueurs</h2>';
            echo '<form method="post" action="functions.php" id="circle-container">';
            echo '<button class="circle" name="player_count" value="2">2</button>';
            echo '<button class="circle" name="player_count" value="3">3</button>';
            echo '<button class="circle" name="player_count" value="4">4</button>';
            echo '<button class="circle" name="player_count" value="5">5</button>';
            echo '</form>';
        }
    }
}
