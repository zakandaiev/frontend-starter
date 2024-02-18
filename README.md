<img width=150 align="right" src="https://raw.githubusercontent.com/zakandaiev/frontend-starter/main/src/root-files/favicon.svg" alt="HTML5 Logo">

# FrontEnd Starter

FrontEnd Starter is a boilerplate kit for easy building modern static web-sites using Gulp

## Homepage
[https://zakandaiev.github.io/frontend-starter](https://zakandaiev.github.io/frontend-starter)

## How to use

### Instalation

``` bash
# Clone the repository
git clone https://github.com/zakandaiev/frontend-starter.git

# Go to the folder
cd frontend-starter

# Install packages
npm i

# Remove the link to the original repository
# - if you use Windows system
Remove-Item .git -Recurse -Force
# - or if you use Unix system
rm -rf .git
```

### Development

``` bash
# Start development mode with live-server
npm run dev
```

### Building

``` bash
# Build static files for production
npm run build
# or
npm run prod

# Start server for build preview
npm run preview
```

## Features
* Modern environment for development
* Twig template engine
* Well thought-out and convenient project structure
* HTML5 and CSS3 ready
* SEO friendly
* SASS/SCSS preprocessor
* Autoprefixer
* Live-server with hot-reload
* HTML, CSS, JS, images auto minifier
* Ready-to-use Javascript utils, HTML styled components, CSS helpers, SASS utils etc.
* reseter.css
* .htaccess, robots.txt, sitemap.xml, favicon
* 404 page
* And many more...

## TODO
* eslint `import/no-unresolved` errors in all scripts from `./src/js/**/*.js` folder
* @rollup/plugin-node-resolve
