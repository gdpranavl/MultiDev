function generate(description) {
    const keywords = {
      button: '<button id="myButton">Click me</button>',
      heading: '<h1>Welcome</h1>',
      paragraph: '<p>This is a paragraph.</p>',
      image: '<img src="https://via.placeholder.com/150" alt="Image">',
      link: '<a href="#">Link</a>'
    };
  
    const elements = [];
    let html = '<html><body>';
  
    for (const [keyword, snippet] of Object.entries(keywords)) {
      if (description.toLowerCase().includes(keyword)) {
        html += snippet;
        elements.push(keyword);
      }
    }
  
    if (elements.length === 0) {
      html += '<p>No specific elements requested. Here is a default page.</p>';
    }
  
    html += '</body></html>';
    return { html, elements };
  }
  
  module.exports = { generate };