<?php
// enquire.php - Handles floating enquiry form submissions and sends email via PHPMailer

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Gather and sanitize inputs
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // SMTP configuration (same as submit.php)
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'goplarvindsinha@gmail.com';
    $mail->Password   = 'cxwk hrsu lzxo amph';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('aarviteksystems@gmail.com', 'Site Owner');

    // Email content
    $mail->isHTML(true);
    $mail->Subject = "Enquiry: {$service}";
    $mail->Body = "<p><strong>Name:</strong> {$name}</p>"
                . "<p><strong>Email:</strong> {$email}</p>"
                . "<p><strong>Phone:</strong> {$phone}</p>"
                . "<p><strong>Service:</strong> {$service}</p>"
                . "<p><strong>Message:</strong><br>{$message}</p>";
    $mail->AltBody = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nService: {$service}\nMessage:\n{$message}";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Enquiry sent successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Message could not be sent.', 'details' => $mail->ErrorInfo]);
}
?>
