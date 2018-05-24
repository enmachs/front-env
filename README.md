# Frontend - Environment
A simple environment for her

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

## Render partials
To reduce code, create a file '_partial_name.haml' in partials folder and render wherever you want with this: 
(We recommend to create all partials inside partial's folder)
```
= Haml::Engine.new(File.read('app/partials/_partial_name.haml')).render
```
