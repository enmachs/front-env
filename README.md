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

## Add bootstrap 4
Install bootstrap running this command in your proyect folder
```
npm install bootstrap@4.0.0-alpha.6 --save-dev
```


Once run this command to add bootstrap files to yours
```
gulp add_bootstrap
```


Add links and scripts to your haml files
```haml
%link{rel: "stylesheet", href:"assets/css/bootstrap.min.css"}/
%script{src: "assets/js/bootstrap.js"}
```

Compile and run your server again
```
gulp set
gulp
```

## Remove bootstrap 4
Execute this
```
npm uninstall bootstrap --save-dev
```
Then run this command
```
gulp remove_bootstrap
```
Now delete the link and script from your haml files (Important!!)

And then..
```
gulp set
gulp
```

## Add materialize
Install materialie
```
npm install materialize-css --save-dev
```
Copy files to your folders
```
gulp add_materialize
```
Add links and scripts to your haml files
```haml
%link{rel: "stylesheet", href:"assets/css/materialize.css"}/
%script{src: "assets/js/materialize.js"}
```

Compile and run your server again
```
gulp set
gulp
```

## Remove materialize
