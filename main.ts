import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const rawJsonMiddleware = bodyParser.raw({ type: 'application/json' });
const jsonMiddleware = express.json();

// Ajouter des en-têtes CORS à toutes les requêtes
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));

// Register new members (/register)
app.post('/register', jsonMiddleware, (req, res) => {
	// const emailAccount = req.body.email_account;
	// const emailEmployee = req.body.email_employee;
	// const firstNameEmployee = req.body.first_name;
	// const lastNameEmployee = req.body.last_name;
	// const passwordEmployee = req.body.password;

	// console.log(emailAccount, emailEmployee, firstNameEmployee, lastNameEmployee, passwordEmployee);

});

// Export the Express API
export default app;
