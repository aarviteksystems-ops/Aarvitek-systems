<?php
// enquire.php – Handles floating enquiry form submissions and sends email via PHPMailer

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Load Composer autoloader
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
} elseif (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ------------------------------------------------
// CORS & Headers
// ------------------------------------------------
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed. Please send a POST request.']);
    exit;
}

// ------------------------------------------------
// Parse Input (Support both JSON body and FormData / $_POST)
// ------------------------------------------------
$rawInput = file_get_contents('php://input');
$jsonData = json_decode($rawInput, true);

$name    = trim($jsonData['name']    ?? $_POST['name']    ?? '');
$email   = trim($jsonData['email']   ?? $_POST['email']   ?? '');
$phone   = trim($jsonData['phone']   ?? $_POST['phone']   ?? '');
$service = trim($jsonData['service'] ?? $_POST['service'] ?? 'General Inquiry');
$message = trim($jsonData['message'] ?? $_POST['message'] ?? '');

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields (name, email, message).']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
    exit;
}

// ------------------------------------------------
// PHPMailer Configuration
// ------------------------------------------------
if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'PHPMailer is not installed. Please run "composer require phpmailer/phpmailer".'
    ]);
    exit;
}

$mail = new PHPMailer(true);

try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'goplarvindsinha@gmail.com'; // Your Gmail address
    $mail->Password   = 'cxwk hrsu lzxo amph';       // Gmail App Password (16 chars)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // Recipients
    $mail->setFrom('goplarvindsinha@gmail.com', 'Aarvitek Enquiry Form');
    $mail->addReplyTo($email, $name);
    $mail->addAddress('aarviteksystems@gmail.com', 'Aarvitek Systems');

    // Email Content
    $mail->isHTML(true);
    $mail->Subject = "New Project Enquiry: " . $service;
    $mail->Body    = "
        <div style='font-family: Arial, sans-serif; padding: 20px; color: #333;'>
            <h2 style='color: #7c3aed;'>New Project Enquiry Received</h2>
            <hr style='border: 1px solid #eee; margin-bottom: 20px;' />
            <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
            <p><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></p>
            <p><strong>Phone / WhatsApp:</strong> " . htmlspecialchars($phone ?: 'Not provided') . "</p>
            <p><strong>Selected Service:</strong> " . htmlspecialchars($service) . "</p>
            <p><strong>Project Details / Requirements:</strong></p>
            <div style='background-color: #f5f3ff; padding: 15px; border-left: 4px solid #7c3aed; border-radius: 4px; white-space: pre-wrap;'>" . nl2br(htmlspecialchars($message)) . "</div>
        </div>
    ";
    $mail->AltBody = "New Project Enquiry Received\n\nName: {$name}\nEmail: {$email}\nPhone: {$phone}\nService: {$service}\n\nMessage:\n{$message}";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Enquiry sent successfully!']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Message could not be sent.',
        'details' => $mail->ErrorInfo ?: $e->getMessage()
    ]);
}
?>
