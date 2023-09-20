<?php
// Connexion à la base de données
$serveur = "localhost";
$utilisateur = "root";
$mot_de_passe = "";
$base_de_donnees = "memory";

$connexion = new mysqli($serveur, $utilisateur, $mot_de_passe, $base_de_donnees, 3306);

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
            echo '<input type="hidden" name="mode" value="solo">';
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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["player_count"])) {
        $playerCount = $_POST["player_count"];

        if ($connexion) { // Assurez-vous que la connexion est établie avec succès

            // Boucle pour récupérer les pseudos des joueurs
            for ($i = 1; $i <= $playerCount; $i++) {
                if (isset($_POST["pseudo" . $i])) {
                    $pseudo = $_POST["pseudo" . $i];

                    // Insérer le pseudo dans la base de données
                    $sql = "INSERT INTO user (pseudo) VALUES ('$pseudo')";

                    if ($connexion->query($sql) === TRUE) {
                        echo "Pseudo du joueur $i inséré avec succès dans la base de données.<br>";
                    } else {
                        echo "Erreur lors de l'insertion du pseudo du joueur $i : " . $connexion->error . "<br>";
                    }
                }
            }
        }
    } elseif (isset($_POST["mode"])) {
        $mode = $_POST["mode"];
        if ($mode === "solo") {
            if (isset($_POST["pseudo"])) {
                $pseudo = $_POST["pseudo"];

                if ($connexion) { // Assurez-vous que la connexion est établie avec succès

                    // Insérer le pseudo dans la base de données
                    $sql = "INSERT INTO user (pseudo) VALUES ('$pseudo')";

                    if ($connexion->query($sql) === TRUE) {
                        echo "Pseudo inséré avec succès dans la base de données.<br>";
                    } else {
                        echo "Erreur lors de l'insertion du pseudo : " . $connexion->error . "<br>";
                    }
                }
            }
        }
    }
}
