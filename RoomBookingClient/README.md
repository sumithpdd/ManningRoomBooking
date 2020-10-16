# RoomBookingClient

ng new RoomBookingClient
cd .\RoomBookingClient\
code .

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Installing Bootstrap

npm install bootstrap jquery popper.js

``` javascript
"styles": [
              "src/styles.css",
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
            "scripts": [
              "node_modules/jquery/dist/jquery.min.js",
              "node_modules/popper.js/dist/umd/popper.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js"
            ]
```

## Add font awesome

npm install --save font-awesome angular-font-awesome

```javascript
//...
import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  //...
  imports: [
    //...
    AngularFontAwesomeModule
  ],
  //...
})
export class AppModule { }

```

``` javascript
"styles": [
    "styles.css",
    "../node_modules/font-awesome/css/font-awesome.css"
]
```

## To create a data service

ng g s Data

ng serve
ng serve --prod
ng serve -c local
