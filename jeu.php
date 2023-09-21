<?php
$serveur = "localhost";
$utilisateur = "root";
$mot_de_passe = "";
$base_de_donnees = "memory";

$connexion = new mysqli($serveur, $utilisateur, $mot_de_passe, $base_de_donnees, 3306);

if ($connexion->connect_error) {
  die("La connexion à la base de données a échoué : " . $connexion->connect_error);
}

session_start(); // Démarrez la session

if (isset($_SESSION["pseudo"])) {
  $pseudo = $_SESSION["pseudo"];
  // Vous avez maintenant le pseudo du joueur dans la variable $pseudo
  // Faites ce que vous devez faire avec le pseudo ici
} else {
  // Redirigez l'utilisateur vers la page où il peut entrer son pseudo s'il n'est pas encore défini
  header("Location: functions.php");
  exit; // Assurez-vous de sortir du script après la redirection.
}

// Exécutez une requête SQL pour récupérer les données des joueurs triées par win en ordre décroissant
$sql = "SELECT pseudo, win FROM user ORDER BY win DESC";
$result = $connexion->query($sql);

$sqlWins = "SELECT win FROM user WHERE pseudo = '$pseudo'";
$resultWins = $connexion->query($sqlWins);

// Vérifiez si la requête a réussi
if ($resultWins) {
  $rowWins = $resultWins->fetch_assoc();
  $victoiresJoueur = $rowWins['win'];
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["restart"])) {
  // Incrémentez le nombre de victoires
  $victoiresJoueur++; // Augmentez le nombre de victoires de 1

  // Mettez à jour le nombre de victoires dans la base de données
  $updateWinsQuery = "UPDATE user SET win = $victoiresJoueur WHERE pseudo = '$pseudo'";

  if ($connexion->query($updateWinsQuery) === TRUE) {
    // La mise à jour a réussi, vous pouvez rediriger l'utilisateur vers la page du jeu ou effectuer d'autres actions.
    header("Location: jeu.php");
  } else {
    echo "Erreur lors de la mise à jour des victoires : " . $connexion->error;
  }
}

?>


<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Memory</title>
  <link rel="stylesheet" href="style2.css" />
</head>

<body>
  <div class="home">
    <img src="../assets/maison.png" alt="">
  </div>
  <div class="background"></div>
    <div class="overlay"></div>
  <h1 style='font-size: 65px; margin-bottom: 10px ;'>JEU DU MEMORY</h1>
  <main>
    <aside>
      <fieldset>
        <legend>Pseudo</legend>
        <?php
        printf($pseudo);
        ?>
      </fieldset>
      <fieldset>
        <legend>Victoires</legend>
        <?php
        echo $victoiresJoueur;
        ?>
      </fieldset>
      <fieldset class="scoreboard">
        Scoreboard
      </fieldset>
    </aside>
    <div class="title">
      <h2>Choisissez le nombre de pairs !</h2>
    </div>
    <h2 class="titlePlay">Trouvez les paires !</h2>
    <div class="choose">
      <span class="choosePairsNumber" data-value="4">4</span>
      <span class="choosePairsNumber" data-value="8">8</span>
      <span class="choosePairsNumber" data-value="10">10</span>
      <span class="choosePairsNumber" data-value="12">12</span>
    </div>
  </main>
  <div id="grid-container">
    <div id="tableau">

    </div>
    <div class="content">
      <form method="post" action="">
        <button type="submit" name="restart">Restart</button>
      </form>
    </div>
  </div>

  <div class="modal">
    <div>
      <table>
        <tr>
          <th>Numero</th>
          <th>Nom</th>
          <th>Win</th>
        </tr>
        <?php

        // Vérifiez si la requête a réussi
        if ($result) {
          $counter = 1;
          while ($row = $result->fetch_assoc()) {
            // Vérifiez si la valeur de "win" est supérieure à 0
            if ($row['win'] > 0) {
              echo '<tr>';
              echo '<td>' . $counter . '</td>';
              echo '<td>' . $row['pseudo'] . '</td>';
              echo '<td>' . $row['win'] . '</td>';
              echo '</tr>';
              $counter++; // Incrémente le compteur
            }
          }
        } else {
          // Gérez les erreurs de requête ici
          echo "Erreur lors de l'exécution de la requête : " . $connexion->error;
        }
        ?>

      </table>
    </div>
    <span class="closeButton">X</span>
  </div>

  <script src="script.js"></script>
</body>

</html>