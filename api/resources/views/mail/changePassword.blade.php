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
      border: 2px solid #f5f5f5">var/www/etoolbox/api
    <tr>
      <th>
        <h1 
          style="
          font-size: 35px;
          color:#2f2e44;
          margin: 0;
          padding-bottom: 30px;">
          EnglishNerd
        </h1>
      </th>
    </tr>
    <tr>
      <td>
        <img src="https://englishnerd.org/img/email-recovery.png" style="width: 100%; max-width: 250px;" alt="#" src="">
      </td>
    </tr>
    <tr>
      <td>
        <h1 style="
          font-size: 25px;
          color: #2f2e44;
          margin: 0;
          padding: 20px 0;">
          Your recovery code: {{ $code }}
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
          Use this code to recovery your password on 
          <a 
            href="https://englishnerd.org/" 
            style="color:#6666ff;">
            englishnerd.org.
          </a>
          <br>
          If it wasn't you, change your password as soon as possible.
        </p>
      </td>
    </tr>
  </table>

</body>
