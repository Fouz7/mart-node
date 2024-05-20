import express, {json} from "express";
import cors from "cors";
import {connect} from 'mongoose'
import { graphqlHTTP as graphQLHTTP } from 'express-graphql';
import schema from './src/graphql/index.js';

const app = express();
const PORT = 3000;
const mongoURI = 'mongodb://localhost:27017';

connect(mongoURI, {'dbName' : 'mymart'})
    .then( result => console.log('Connected to MongoDB'))
    .catch( error => console.log(error));

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.send('Welcome to MyMart');
})

app.use('/graphql', graphQLHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})