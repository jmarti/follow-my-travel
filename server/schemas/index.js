import { GraphQLSchema } from 'graphql';
import Query from './query';
import Mutation from './mutation';
const Squema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});

export default Squema;