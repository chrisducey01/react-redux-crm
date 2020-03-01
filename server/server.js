require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./utils/passport');
const mongoose = require('mongoose');
const path = require('path');
const app = express()
const routes = require("./controllers");

const PORT = process.env.PORT || 8080


/*************************************************
 * Express Middleware
**************************************************/

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}
else {
	app.use(morgan('combined'))
	app.use(express.static("client/build"));
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Connect to mongodb to store crm data and session store
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/crm", {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).catch(err => {
	console.log(err);
})

//Setup session with mongodb store
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false,
		saveUninitialized: false
	})
)

//Use passport for authentication
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

app.use(routes);

//Serve up React App
if(process.env.NODE_ENV === 'production'){
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/build/index.html"));
	});	
}
else{
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/public/index.html"));
	});	
}

//Start up and listen on port for requests
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
