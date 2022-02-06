import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient;

/**
 * 创建 apollo 客户端新实例
 * @returns
 */
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // 判断是否在服务端运行
    link: new HttpLink({
      uri: process.env.NEXTAUTH_URL + "/api/graphql",
      credentials: "same-origin",
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: concatPagination(),
          },
        },
      },
    }),
  });
}

/**
 * 初始化 Apollo 客户端
 * @param initialState
 * @returns
 */
export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    // 客户端请求数据时 加载缓存
    const existingCache = _apolloClient.extract();

    // 将现有的缓存合并
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // 使用合并后的数据恢复缓存
    _apolloClient.cache.restore(data);
  }
  // SSG/SSR 始终返回新的 apollo 客户端
  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

/**
 * 将 apollo 缓存挂载到页面属性上
 * @param client
 * @param pageProps
 * @returns
 */
export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

/**
 * 获取 添加了缓存的 apollo 实例
 * @param pageProps
 * @returns
 */
export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
