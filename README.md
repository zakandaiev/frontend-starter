<img width=150 align="right" src="https://raw.githubusercontent.com/zakandaiev/frontend-starter/main/src/public/favicon.svg" alt="HTML5 Logo">

# frontend-starter

FrontEnd Starter is a boilerplate kit for easy building modern static web-sites using Gulp

## Homepage
[https://zakandaiev.github.io/frontend-starter](https://zakandaiev.github.io/frontend-starter)

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

## How to use

### Install

``` bash
# Clone the repository
git clone https://github.com/zakandaiev/frontend-starter.git

# Go to the folder
cd frontend-starter

# Install
npm i
# or
npm install

# Remove link to the original repository
# - if you use Windows system
Remove-Item .git -Recurse -Force
# - or if you use Unix system
rm -rf .git
```

### Develop

``` bash
# Start development mode with live-server
npm run dev
# or with options
npm run dev --port 3000
```

### Build

``` bash
# Build static files for production
npm run build
# or
npm run prod
# or with options
npm run build --base=/subdomain --dist=./dest

# Start server for build preview
npm run preview
# or with options
npm run preview --port 3001
```

### Lint

``` bash
# ESLint
npm run lint:js
# or
npm run lint:js:fix

# StyleLint
npm run lint:css
# or
npm run lint:css:fix
```

### Backend emulation

``` bash
# Fastify listen backend.js
npm run backend
```
