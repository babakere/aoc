<?php
// Connect to SQLite database
$db = new PDO('sqlite:AOC.db');

// Prepare SQL statement to delete user by name
$stmt = $db->prepare('DELETE FROM users WHERE name = :name');

// Bind the parameter values to the prepared statement
$stmt->bindParam(':name', $_POST['name']);

// Execute the prepared statement to delete the user
$stmt->execute();

// Close the database connection
$db = null;

// Return a response indicating success
echo 'User deleted successfully';
?>
