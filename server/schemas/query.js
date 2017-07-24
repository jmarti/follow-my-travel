import {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString
} from 'graphql';
import PersonSchema from './personSchema';
import PostSchema from './postSchema';
import { person, post } from '../models';

const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'This is a root query',
	fields: () => {
		return {
			people: {
				type: new GraphQLList(PersonSchema),
				args: {
					id: {
						type: GraphQLInt
					},
					email: {
						type: GraphQLString
					}
				},
				resolve(root, args) {
					return person.findAll({where: args});
				}
			},
			posts: {
				type: new GraphQLList(PostSchema),
				args: {
					id: {
						type: GraphQLInt
					},
					title: {
						type: GraphQLString
					}
				},
				resolve(root, args) {
					return post.findAll({where: args});
				}
			}
		}
	}
});

export default Query;