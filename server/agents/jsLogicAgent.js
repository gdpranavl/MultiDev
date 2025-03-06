function addInteractivity(html, description) {
    // Check if the description mentions "button" and "alert"
    if (description.toLowerCase().includes('button') && description.toLowerCase().includes('alert')) {
      // Add a script to make the button show an alert
      const script = `
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            const button = document.querySelector('button');
            if (button) {
              button.addEventListener('click', function() {
                alert('Button clicked!');
              });
            }
          });
        </script>
      `;
      // Insert the script before the closing </body> tag
      html = html.replace('</body>', script + '</body>');
    }
    return html;
  }
  
  module.exports = { addInteractivity };