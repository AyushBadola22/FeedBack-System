
import express from 'express';
import LoginRouter from './router/loginRouter.js'; 

const app = express();

app.use(express.json());
app.use('/', LoginRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
