<?php
// submit.php - Handles contact form submissions and sends email using PHPMailer

// Require Composer's autoloader (adjust path if needed)
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Set response headers for JSON and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Allow only POST requests (after handling OPTIONS)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Retrieve and sanitize input fields
$input   = json_decode(file_get_contents('php://input'), true);
$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? 'Contact Form Submission');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Basic email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // Server settings (configure these for your environment)
    // $mail->SMTPDebug = 2; // Enable verbose debug output (remove in production)
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; // Set the SMTP server to send through
    $mail->SMTPAuth   = true;
    $mail->Username   = 'goplarvindsinha@gmail.com'; // SMTP username
    $mail->Password   = 'cxwk hrsu lzxo amph'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
    $mail->Port       = 587; // TCP port to connect to

    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('aarviteksystems@gmail.com', 'Site Owner'); // Change to your receiving address

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
    http_response_code(500);
    echo json_encode(['error' => 'Message could not be sent.', 'details' => $mail->ErrorInfo]);
}
?>