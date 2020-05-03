const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: 'postgresql-spherical-87913',
		user: 'postgres',
		password: '123',
		database: 'postgres'
	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {res.send('it is working!');});

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});
app.post('/signIn', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.listen(process.env.PORT || 3001, ()=> {
	console.log('app is running on port ${process.env.PORT}');
});