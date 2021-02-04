<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Verify Mail</title>
</head>

<body>

  <table 
    cellpadding="0" 
    cellspacing="0" 
    style="
      margin: 0 auto;
      padding: 50px;
      text-align: center;
      font-family: Arial, Helvetica, sans-serif;
      width: 100%;
      max-width: 600px;
      border-radius: 15px;
      border: 2px solid #f5f5f5">
    <tr>
      <th>
        <h1 
          style="
            font-size: 35px;
            color:#2f2e44;
            margin: 0;
            padding-bottom: 30px;
            font-weight: 600;">
              EnglishNerd
        </h1>
      </th>
    </tr>
    <tr>
      <td>
        <img 
          style="
            width: 100%; 
            max-width: 250px; 
            outline: none;
            text-decoration: none;
            border:none;
            margin: 0;
            color: #a1a1b1;
            font-weight: 500;" 
          alt="Here should be an image, but your email client has blocked it 😔"  
          src="https://englishnerd.org/img/email-verify.png">
      </td>
    </tr>
    <tr>
      <td>
        <h1 style="
          font-size: 25px;
          color: #2f2e44;
          margin: 0;
          padding: 20px 0;
          font-weight: 600;">
          Your verification code: {{ $code }}
        </h1>
      </td>
    </tr>
    <tr>
      <td>
        <p style="
          font-size:16px; 
          margin: 0; 
          color:#a1a1b1;
          line-height: 1.3;">
          Hello!
          <br>
          <br>
          Thanks for your registration on
          <a 
            href="https://englishnerd.org/" 
            style="color:#6666ff;">
            englishnerd.org.
          </a>
          <br>
          Please use the code above to verify your email.
        </p>
      </td>
    </tr>
  </table>

</body>

</html>

