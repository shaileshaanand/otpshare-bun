import * as elements from "typed-html";

const BaseHtml = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/htmx.org@1.9.5"></script>
   <link href="/assets/styles.css" rel="stylesheet">
</head>
<body>
${children}  
</body>
</html>
`;

export default BaseHtml;
