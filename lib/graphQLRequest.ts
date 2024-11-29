import { GraphQLClient, request } from "graphql-request";

export const GraphQLRequest = async (
  graphQLSchema: any,
  variable: any
): Promise<any> => {
  const client = new GraphQLClient(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
    {
      cache: "no-store",
    }
  );

  return client.request(graphQLSchema, variable);
};
