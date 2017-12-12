# Frontend - Environment
A simple environment for her

## Installing 
Install gulp 
```
sudo npm install gulp -g
```
And run
```
gulp set
gulp
```

## Add bootstrap 4

Install bootstrap running this command in your proyect folder
```
npm install bootstrap@4.0.0-alpha.6
```


Once run this command to add bootstrap files to yours
```
gulp add_bootstrap
```


Add links and scripts to your haml files
```haml
%link{rel: "stylesheet", href:"css/bootstrap.min.css"}/
%script{src: "js/bootstrap.js"}
```

Compile and run your server again
```
gulp set
gulp
```

## Remove bootstrap 4
