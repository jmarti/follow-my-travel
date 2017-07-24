import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList
} from 'graphql';
import PostSchema from './postSchema';

const PersonSchema = new GraphQLObjectType({
	name: 'Person',
	description: 'This represents a Person',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(person) {
					return person.id;
				}
			},
			firstName: {
				type: GraphQLString,
				resolve(person) {
					return person.firstName
				}
			},
			lastName: {
				type: GraphQLString,
				resolve(person) {
					return person.lastName
				}
			},
			email: {
				type: GraphQLString,
				resolve(person) {
					return person.email
				}
			},
			posts: {
				type: new GraphQLList(PostSchema),
				resolve(person) {
					return person.getPosts();
				}
			}
		}
	}
});

export default PersonSchema;