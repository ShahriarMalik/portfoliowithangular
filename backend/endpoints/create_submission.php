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

    // Debugging: Display received inputs
    // echo "Received inputs: Name = $name, Email = $email, Message = $message\n";

    // Read the SQL file
    $sql = file_get_contents('../sql/contact_form_submissions.sql');
    if ($sql === false) {
        http_response_code(500);
        echo "Error: Unable to read the SQL file.";
        exit();
    }

    // Debugging: Display SQL content
    // echo "SQL Content: $sql\n";

    // Prepare and execute the SQL statement
    $result = pg_query_params($conn, $sql, array($name, $email, $message));

    if ($result) {
        // Send a response back to the client
        http_response_code(200);
        echo json_encode([
            "message"=> "Thank you! Your message has been received."
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "message"=> "Something went wrong."
        ]);
    }

    // Close the database connection
    pg_close($conn);
} else {
    // Handle invalid request methods
    http_response_code(405);
    echo json_encode([
        "message"=> "Invalid request."
    ]);
}
?>
