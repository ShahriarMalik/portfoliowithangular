<?php
// Include the database configuration
include('config/db.php');

// Function to execute SQL script
function executeSQLScript($conn, $filePath) {
    // Read the file contents
    $sql = file_get_contents($filePath);
    if ($sql === false) {
        die("Error: Unable to read the SQL file.");
    }

    // Execute the SQL script
    $result = pg_query($conn, $sql);
    if ($result === false) {
        die("Error: Failed to execute SQL script. " . pg_last_error($conn));
    }

    echo "SQL script executed successfully.";
}

// Path to the SQL script
$sqlFilePath = 'sql/contact_form_submissions.sql';

// Execute the script
executeSQLScript($conn, $sqlFilePath);

// Close the database connection
pg_close($conn);
?>
