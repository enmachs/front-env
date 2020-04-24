# Frontend - Environment
A simple frontend environment for her

## Installing
Install gulp
```
sudo npm install gulp -g
```
Install dependencies
```
npm install
```
And run
```
gulp set
gulp
```
## Resources (Docs)
- [Bourbon](https://www.bourbon.io/docs/latest/)
- [Neat](https://neat.bourbon.io/docs/latest/)
- [Slim](https://github.com/slim-template/slim/)
- [Html2Slim](https://html2slim.herokuapp.com/)

## Render partials
To encapsulate code, create a file 'partial_name.slim' in partials folder and render wherever you want with this:
(We recommend to create all partials inside partial's folder)
```
include partial_name
```
