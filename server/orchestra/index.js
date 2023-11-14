import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";
import Redis from "ioredis";

const PORT = Number(process.env.PORT) || 80;

const REDIS_URL = process.env.REDIS_URL || "redis://default:Lvuk9PuAxHSgHHvlgPA5GEqVGutBBMQh@redis-13653.c91.us-east-1-3.ec2.cloud.redislabs.com:13653";

const redis = new Redis(REDIS_URL);

const APP_URI = process.env.APP_URI || "http://localhost:4002";
const USER_URI = process.env.USER_URI || "http://localhost:4001";

const typeDefs = `#graphql

  type User {
    _id: ID,
    username: String,
    password: String,
    email: String,
    role: String,
    phoneNumber: String,
    address: String
  }

  type Post {
    id: ID,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    categoryId: ID,
    authorId: String,
    createdAt: String,
    updatedAt: String,
    Category : Category,
    Tags : [Tag],
    User: User
  }

  type Category {
    id: ID,
    name: String,
    createdAt: String,
    updatedAt: String
  }

  type Tag {
    id: ID,
    name: String,
    postId: ID,
    createdAt: String,
    updatedAt: String
  }

  type addUserResponse {
    acknowledged: Boolean,
    insertedId: String
  }

  type messageReponse {
    message: String
  }

  type Query {
    users: [User],
    posts: [Post],
    getPostById(id: ID!): Post,
    getUserById(id: ID!): User
  }

  type Mutation {
    addUser( email: String!,username: String, password: String!, address: String, phoneNumber:String): addUserResponse,
    deleteUser(id: ID!): messageReponse,
    createPost(title:String!, content:String!, categoryId: Int!, imgUrl: String, authorId: String): Post,
    updatePost(id: ID!, title: String, content: String, categoryId: Int, imgUrl: String ): messageReponse,
    deletePost(id: ID!): messageReponse
  }
`;

const resolvers = {
    Query: {
        users: async () => {
            try {
                const usersCache = await redis.get("users");
                if (usersCache) return JSON.parse(usersCache);
                let { data: users } = await axios.get(USER_URI);
                await redis.set("users", JSON.stringify(users));
                return users;
            } catch (error) {
                console.log(error);
            }
        },
        posts: async () => {
            try {
                const postsCache = await redis.get("posts");
                if (postsCache) return JSON.parse(postsCache);
                let { data: posts } = await axios.get(APP_URI + "/posts");
                // posts = posts.map(async (post) => {
                //     const { data: user } = await axios.get(USER_URI + "/" + post.authorId);
                //     post.User = user;
                //     return post;
                // });
                await redis.set("posts", JSON.stringify(posts));
                return posts;
            } catch (error) {
                console.log(error);
            }
        },
        getPostById: async (parent, args) => {
            const id = args.id;
            try {
                let { data: post } = await axios.get(APP_URI + "/posts/" + id);
                const { data: user } = await axios.get(USER_URI + "/" + post.authorId);
                post.User = user;
                return post;
            } catch (error) {
                console.log(error);
            }
        },
        getUserById: async (parent, args) => {
            const id = args.id;
            try {
                const { data: user } = await axios.get(USER_URI + "/" + id);
                return user;
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const { email, password, username, address, phoneNumber } = args;
            try {
                const postBody = { email, password, username, phoneNumber, address };
                const { data: response } = await axios.post(USER_URI + "/", postBody);
                await redis.del("users");
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        deleteUser: async (parent, args) => {
            const { id } = args;
            try {
                const { data: response } = await axios.delete(USER_URI + "/" + id);
                await redis.del("users");
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        createPost: async (parent, args) => {
            const { title, content, categoryId, imgUrl, authorId } = args;
            try {
                const postBody = { title, content, categoryId, imgUrl, authorId };
                const { data: createdPost } = await axios.post(APP_URI + "/posts", postBody);
                await redis.del("posts");
                return createdPost;
            } catch (error) {
                console.log(error);
            }
        },
        updatePost: async (parent, args) => {
            const { id, title, content, categoryId, imgUrl } = args;
            try {
                const body = { title, content, categoryId, imgUrl };
                const { data: updateMessage } = await axios.put(APP_URI + "/posts/" + id, body);
                await redis.del("posts");
                return updateMessage;
            } catch (error) {
                console.log(error);
            }
        },
        deletePost: async (parent, args) => {
            const { id } = args;
            try {
                const { data: deleteMessage } = await axios.delete(APP_URI + "/posts/" + id);
                await redis.del("posts");
                return deleteMessage;
            } catch (error) {
                console.log(error);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

startStandaloneServer(server, {
    listen: { port: PORT }
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});
