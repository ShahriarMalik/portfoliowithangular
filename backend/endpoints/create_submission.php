<?php
include('../config/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8');
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8');

    // Validate inputs
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "All fields are required and email must be valid.";
        exit();
    }

    // Read the SQL file
    $sql = file_get_contents('../sql/insert_submission.sql');
    if ($sql === false) {
        http_response_code(500);
        echo "Error: Unable to read the SQL file.";
        exit();
    }

    // Prepare and execute the SQL statement
    $result = pg_query_params($conn, $sql, array($name, $email, $message));

    if ($result) {
        // Send a response back to the client
        http_response_code(200);
        echo "Hi! Thank you! Your message has been received.";
    } else {
        http_response_code(500);
        echo "Error: Failed to insert data into the database.";
    }

    // Close the database connection
    pg_close($conn);
} else {
    // Handle invalid request methods
    http_response_code(405);
    echo "Invalid request method.";
}
?>
