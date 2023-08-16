<?php
require '../coors.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
try {
  $name=$_POST['name'];
  $phone=$_POST['phone'];
  $email=$_POST['email'];
  $vehicle=$_POST['vehicle'];
  $comments=$_POST['comments'];

  $mail->setFrom($email, $name);
  $mail->addAddress('andres.acevedo@surman.com', 'Andres Acevedo');
  $mail->addAddress('diego.herrera@surman.com', 'Diego Herrera');
  $mail->isHTML(true);
  $mail->CharSet = 'UTF-8';                       
  $mail->Body = 'Nombre Completo: '.$name.' <br>
  E-mail: '.$email.' <br>
  Teléfono: '.$phone.' <br>
  UTM_Source: Web <br>
  Comentario: '.preg_replace("/([\r\n]+)|(\\n)|(\\\\n)|(\\\\r)|(\\r)|(\r+)|(\n+)|(\v+)/im","<br>",$comments).' | Vehiculo> '.$vehicle.' | Categoría> Servicio';

  if($mail->send()){
      echo json_encode(["sent"=>true]);
  }else{
      echo json_encode(["error"=>ERROR]);
  }
} catch (Exception $e) {
  echo json_encode(["error"=>$mail->ErrorInfo]);
}
?>