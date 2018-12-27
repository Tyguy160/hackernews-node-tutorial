const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Full stack tutorial on GraphQL',
  },
];
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links.filter((link, index) => {
        // Update the link
        if (link.id === args.id) {
          link.description = args.description
            ? args.description
            : link.description;
          link.url = args.url ? args.url : link.url;
        }
        return link.id === args.id;
      });
      return link[0];
    },
    deleteLink: (parent, args) => {
      const link = links.filter((link, index) => {
        if (link.id === args.id) {
          links.splice(index, 1);
        }
        return link.id === args.id;
      });
      return link[0];
    },
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url,
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
