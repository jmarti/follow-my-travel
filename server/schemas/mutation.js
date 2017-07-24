'use strict';

import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt
} from 'graphql';
import PersonSchema from './personSchema';
import PostSchema from './postSchema';
import { person, post } from '../models';

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Functions to create stuff',
	fields() {
		return {
			addPerson: {
				type: PersonSchema,
				args: {
					firstName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					lastName: {
						type: new GraphQLNonNull(GraphQLString)	
					},
					email: {
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve(root, args) {
					return person.create({
						firstName: args.firstName,
						lastName: args.lastName,
						email: args.email.toLowerCase()
					});
				}
			},
			removePerson: {
				type: PersonSchema,
				args: {
					personId: {
						type: new GraphQLNonNull(GraphQLInt)
					}
				},
				resolve(root, { personId }) {
					return person
						.findById(personId)
						.then(person => person.destroy());
				}
			},
			updatePerson: {
				type: PersonSchema,
				args: {
					personId: {
						type: new GraphQLNonNull(GraphQLInt)
					},
					firstName: {
						type: GraphQLString
					},
					lastName: {
						type: GraphQLString
					},
					email: {
						type: GraphQLString
					}
				},
				resolve(root, args) {
					return person
						.findById(args.personId)
						.then(person => {
							return person.update({
								firstName: args.firstName || person.firstName,
								lastName: args.lastName || person.lastName,
								email: args.email || person.email
							})
						});
				}
			},
			addPost: {
				type: PostSchema,
				args: {
					title: {
						type: new GraphQLNonNull(GraphQLString)
					},
					content: {
						type: new GraphQLNonNull(GraphQLString)	
					},
					personId: {
						type: new GraphQLNonNull(GraphQLInt)
					}
				},
				resolve(root, args) {
					return post.create({
						title: args.title,
						content: args.content,
						personId: args.personId
					});
				}
			},
			removePost: {
				type: PostSchema,
				args: {
					postId: {
						type: new GraphQLNonNull(GraphQLInt)
					}
				},
				resolve(root, { postId }) {
					return post
						.findById(postId)
						.then(post => post.destroy());
				}
			},
			updatePost: {
				type: PostSchema,
				args: {
					postId: {
						type: new GraphQLNonNull(GraphQLInt)
					},
					title: {
						type: GraphQLString
					},
					content: {
						type: GraphQLString
					}
				},
				resolve(root, args) {
					return post
						.findById(args.postId)
						.then(post => {
							return post.update({
								title: args.title || post.title,
								content: args.content || post.content,
							})
						});
				}
			}
		}
	}
});

export default Mutation;