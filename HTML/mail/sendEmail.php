<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name           = $_POST['name'];
$email_address  = $_POST['email'];
$message        = $_POST['message'];
	
// Create the email and send the message

// Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$to = 'info@site.com';

// email subject that will be show in your mail box
$email_subject = "Contact Form:  $name";

// email content
$email_body = "You have received a new message from your website contact form.\n\n".
    "Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";

// This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers = "From: noreply@site.com.ir\n";
$headers .= "Reply-To: $email_address";

// user @ to deny show errors
@mail($to,$email_subject,$email_body,$headers);

return true;			
?>