<?php
// Jednoduchá žádost o CV – pošle e-mail majiteli webu.
header('Content-Type: application/json; charset=utf-8');
function reply($ok, $message) {
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); reply(false, 'Použijte formulář.'); }
if (!empty($_POST['website'])) reply(true, 'Děkuji.');
$email = trim($_POST['email'] ?? '');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422); reply(false, 'Zadejte platný e-mail.');
}
$to = 'sigurd.gnezdilov@gmail.com';
$subject = 'Zadost o CV ze sigurd.site';
$body = "Někdo žádá o CV.\n\nE-mail žadatele: $email\n";
$headers = "From: noreply@sigurd.site\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";
if (!mail($to, $subject, $body, $headers)) {
    http_response_code(500); reply(false, 'Žádost se nepodařilo odeslat.');
}
reply(true, 'Žádost o CV byla odeslána.');
