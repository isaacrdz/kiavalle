<?php
require '../coors.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
try {
  $model=$_POST['model'];
  $year=$_POST['year'];
  $km=$_POST['km'];
  $name=$_POST['name'];
  $phone=$_POST['phone'];
  $email=$_POST['email'];

  $mail->setFrom($email, $name);
  $mail->addAddress('miguel.esparza@surman.com','Miguel Esparza');
  $mail->addAddress('graciela.gomez@surman.com','Graciela Gomez');
  $mail->addAddress('mauricio.cantu@surman.com','Mauricio Cantu');
  $mail->addAddress('victor.garciag@surman.com','Victor Garcia');
  $mail->addAddress('brenda.cabrera@surman.com','Brenda Cabrera');
  $mail->isHTML(true);
  $mail->CharSet = 'UTF-8';                       
  $mail->Subject = "Compramos Tu Auto - Kia Valle Oriente";
  $mail->Body = 'Nombre Completo: '.$name.' <br>
  E-mail: '.$email.' <br>
  Teléfono: '.$phone.' <br>
  UTM_Source: Web <br>
  Comentario: Kilometraje> '.$km.' | Modelo> '.$model.' | Año> '.$year;

  if($mail->send()){
      echo json_encode(["sent"=>true]);
  }else{
      echo json_encode(["error"=>ERROR]);
  }
} catch (Exception $e) {
  echo json_encode(["error"=>$mail->ErrorInfo]);
}
?>