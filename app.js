const express = require('express');
const appRouter = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', appRouter);

//---------------------------
// параматры строки запроса
app.get('/test', (req, res) => {
  res.send(req.query);
});

// middleware
app.get(
  '/mw',
  (req, res, next) => {
    console.log(new Date());
    next();
  },
  (req, res) => {
    res.send('mw hello1');
  }
);

//--------------------------------

module.exports = app;

/*
  get http://localhost:5000/api/users/10?gender=female

  {}


  router.get('/api/users/:userId',()=>{})
                          req.params.userId - параметры маршрута (всегда строки)
                                          req.query.gender - параметры строки запроса (всегда строки)
  req.body                         
*/
