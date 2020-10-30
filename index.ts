import dotenv from "dotenv";
import express from "express";
import path from "path";
import bodyParser from 'body-parser'


// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime 
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

//body parser
app.use( bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json() );

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // render the index template
    res.render( "index" );
} );

app.post('/contact', (req, res) => {
    // console.log("req", req)
    // console.log("res", res)
    let {nombre, email, subject, messages} = req.body
    let data = {
        'nombre': nombre,
        'from': email,
        'subject': subject,
        'message': messages
    }
    res.render('success', {data})
})

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );