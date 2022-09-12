import jwt from 'express-jwt'
import jwks from 'jwks-rsa'
import express from 'express'
import request from 'request'
import cors from 'cors'

var app = express();
const app2 = express()

var port = 8080;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-qh035xs4.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:3065/GetSomething',
    issuer: 'https://dev-qh035xs4.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);
app.use(cors())

app2.use(cors())

app2.get('/token',function(req,res){
    var options = { method: 'POST',
        url: 'https://dev-qh035xs4.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"OZ7TI0C6Uubf5KTqtkmcRVsXckvnu5FZ","client_secret":"xRWjzoRnLB9h3gn7AknEvZZZZxW5cbGJEQgLJJEey8YwdVV_-UvWF4EfQSRpeQP4","audience":"http://localhost:3065/GetSomething","grant_type":"client_credentials"}' };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send(body)
    });
})

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app2.listen(3065,()=>{
    console.log('ok')
})
app.listen(port,()=>{
    console.log('success')
});