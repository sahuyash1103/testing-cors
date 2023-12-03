const express = require('express');
const app = express();
const cors = require('cors');
const expressSession = require('express-session');
const passport = require('passport');

const PORT = process.env.PORT || 3000;

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3001",
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession(
    {
        secret: 'SESSION_SECRET',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 60 * 60 * 24 * 1000 }

    }
));

app.use(passport.initialize());

app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/login', (req, res) => {
    req.session.user = { user: { id: 1 } };
    res.send('Logged in');
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out');
});

const auth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Not logged in');
    }
}

app.get('/user', auth, (req, res) => {
    res.send(req.session.user);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
