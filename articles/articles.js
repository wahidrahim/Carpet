var ARTICLES_DIR = '_articles';

var path = require('path');
var fs = require('fs');
var fm = require('front-matter');

var articles = [];

// Load articles on startup

fs.readdirSync(ARTICLES_DIR).forEach(function(file) {
  var article = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');

  article = format(article);
  if (article.publish)
    articles.push(article);
});

articles.sort(function(a, b) {
  return new Date(b.date) - new Date(a.date);
});

function format(article) {
  var fma = fm(article); // article with front-matter data
  var fmt = {}; // blank object to turn into formatted article

  fmt.title = fma.attributes.title;
  fmt.date = fma.attributes.date;
  fmt.url = fma.attributes.url;
  fmt.tags = fma.attributes.tags;
  fmt.publish = fma.attributes.publish;
  fmt.body = fma.body;

  if (fmt.url === undefined)
    fmt.url = fmt.title.split(' ').join('-').toLowerCase();

  return fmt;
}

module.exports = articles;
