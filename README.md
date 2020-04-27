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
- [Slim](https://github.com/slim-template/slim/)
- [Html2Slim](https://html2slim.herokuapp.com/)

## Render partials
To encapsulate code, create a file 'partial_name.slim' in `app/partials` folder and render wherever you want with this:
(We recommend to create all partials inside partial's folder)
```
include partial_name
```

## Add images
To add images to your project, add them into `app/img` folder, then run:
```
gulp set
```
This will update `dist` folder with the new images.

---