import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString
} from 'graphql';
import PersonSchema from './personSchema';

const PostSchema = new GraphQLObjectType({
	name: 'Post',
	description: 'This is a Post',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(post) {
					return post.id;
				}
			},
			title: {
				type: GraphQLString,
				resolve(post) {
					return post.title
				}
			},
			content: {
				type: GraphQLString,
				resolve(post) {
					return post.content
				}
			},
			person: {
				type: PersonSchema,
				resolve(post) {
					return post.getPerson();
				}
			}
		}
	}
});

export default PostSchema;