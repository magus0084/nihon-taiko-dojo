<?php

//
// 1. Make sure the form is only submitted from the appropriate URL
//
$fromValidSourceUrl = preg_match( '`^(?:http://)?(?:www\.)?joemignano\.com/(?:index\.html)?$`', $_SERVER['HTTP_REFERER'] );
//$fromValidSourceUrl = preg_match( '`^(?:http://)?localhost/ijoemignano/(?:index\.html)?$`', $_SERVER['HTTP_REFERER'] );

if ( $_POST && $fromValidSourceUrl ) {
    
    //
    // 2. Validate for empty fields
    //
    $noEmptyFields = ( !empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['message']) ? true : false );

    if($noEmptyFields) {

        function sanitize($input) {
            if (is_array($input)) {
                foreach( $input as $key=>$val ) {
                    $output[$key] = sanitize($val);
                }
            }
            else {
                $output = strip_tags($input);
            }

            return $output;
        }

        //
        // 3. Sanitze form inputs
        //
        $clean_postArray = sanitize($_POST);


        //
        // 4. Email me
        //
        $date=date("F j, Y, g:i a");
        $to="joeymigs@gmail.com";
        $re="JoeMignano.com: You got a message via your website!!";
        $from="'Joe Mignano'<joseph.mignano@gmail.com>";

        $emailMessage ="Date: ".$date."\n\n";
        $emailMessage.="Name: ".$clean_postArray['name']."\n";
        $emailMessage.="Email: ".$clean_postArray['email']."\n";

        $emailMessage.=$clean_postArray['message'];

        mail("$to","$re","$emailMessage","From: $from");


        //
        //  5. Echo '1' for AJAX to process success ('0' for fail for any reason)
        //
        echo '1';

    }
    else {

        echo 'Please fill in all the fields, thanks.';

    }
    
}
else {
    die();
}

?>