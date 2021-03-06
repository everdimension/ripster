export default function template() {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title></title>
    ${process.env.EXTRACTED_STYLES ? '<link rel="stylesheet" href="/frontend.css" />' : ''}
  </head>
  <body>
    <div id="app"></div>
    <script src="/frontend.js" async></script>
  </body>
</html>
`;
}
