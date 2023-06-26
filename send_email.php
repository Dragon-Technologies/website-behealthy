<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $toEmail = 'behealthy.ict@gmail.com';
  $subject = 'Novo contato pelo formulário';
  $name = $_POST['name'];
  $surname = $_POST['surname'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $form_message = $_POST['message'];

  $message = "Nome: " . $name . "\n\n";
  $message .= "Sobrenome: " . $surname . "\n\n";
  $message .= "E-mail: " . $email . "\n\n";
  $message .= "Telefone: " . $phone . "\n\n";
  $message .= "Mensagem: " . $form_message . "\n\n";

  $headers = "From: " . $email . "\r\n" .
             "Reply-To: " . $email . "\r\n" .
             "X-Mailer: PHP/" . phpversion();

  if (mail($toEmail, $subject, $message, $headers)) {
    echo "Mensagem enviada com sucesso.";
  } else {
    echo "Ocorreu um erro ao enviar a mensagem.";
  }
}
?>
