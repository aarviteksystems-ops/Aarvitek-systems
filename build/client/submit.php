<?php
// submit.php – Handles contact form submissions and sends email via PHPMailer

require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ------------------------------------------------
// CORS & content‑type headers (must be sent *before* any output)
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Pre‑flight handling – respond early and exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ------------------------------------------------
// Only allow POST requests for the actual workflow
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// ------------------------------------------------
// Retrieve JSON payload (the front‑end now sends JSON)
$input   = json_decode(file_get_contents('php://input'), true);
$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? 'Contact Form Submission');
$message = trim($input['message'] ?? '');

// Basic validation
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

// ------------------------------------------------
// PHPMailer configuration
$mail = new PHPMailer(true);
try {
    // Debug (remove or set to 0 in production)
    // $mail->SMTPDebug = 2;

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    // ------------------------------------------------
    // 👉 IMPORTANT: Use a **Gmail App‑Password** (no spaces)
    // ------------------------------------------------
    $mail->Username   = 'goplarvindsinha@gmail.com';
    $mail->Password   = 'YOUR_APP_PASSWORD';   // <-- replace
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('aarviteksystems@gmail.com', 'Site Owner');

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = "<p><strong>Name:</strong> {$name}</p>"
                   . "<p><strong>Email:</strong> {$email}</p>"
                   . "<p><strong>Message:</strong><br>{$message}</p>";
    $mail->AltBody = "Name: {$name}\nEmail: {$email}\nMessage:\n{$message}";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} catch (Exception $e) {
    // Return detailed error info for debugging (remove in prod)
    http_response_code(500);
    echo json_encode([
        'error'   => 'Message could not be sent.',
        'details' => $mail->ErrorInfo,
    ]);
}
?>
