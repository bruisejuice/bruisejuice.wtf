<?php
header('Content-Type: application/json');

require_once '../../secrets/db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $stmt = $pdo->prepare(
        "UPDATE boop_counter
         SET boops = boops + 1
         WHERE id = 1"
    );
    $stmt->execute();
}

$stmt = $pdo->query(
    "SELECT boops FROM boop_counter WHERE id = 1"
);

echo json_encode([
    "boops" => (int)$stmt->fetchColumn()
]);
?>