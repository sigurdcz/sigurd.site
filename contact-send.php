<?php
// Jednoduché odeslání zprávy z kontaktního formuláře.
header('Content-Type: application/json; charset=utf-8');
function reply($ok, $message) {
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); reply(false, 'Použijte formulář.'); }
if (!empty($_POST['website'])) reply(true, 'Děkuji za zprávu.');

$to = 'sigurd.gnezdilov@gmail.com';
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$type = trim($_POST['type'] ?? 'dotaz');
$message = trim($_POST['message'] ?? '');
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(422); reply(false, 'Vyplňte jméno, platný e-mail a zprávu.');
}
$name = str_replace(["\r", "\n"], ' ', $name);
$type = str_replace(["\r", "\n"], ' ', $type);
$subject = 'Novy dotaz ze sigurd.site';
$body = "Jmeno: $name\nEmail: $email\nTyp: $type\n\nZprava:\n$message\n";
$headers = "From: noreply@sigurd.site\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";
if (!mail($to, $subject, $body, $headers)) {
    http_response_code(500); reply(false, 'E-mail se nepodařilo odeslat.');
}
reply(true, 'Zpráva byla odeslána. Děkuji!');
