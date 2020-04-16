---
title: GraphQL 介绍
sidebarTitle: GraphQL 介绍
layout: ../_core/DocsLayout
category: Learn
permalink: /learn/
next: /learn/queries/
---

> Learn about GraphQL, how it works, and how to use it in this series of articles. Looking for documentation on how to build a GraphQL service? There are libraries to help you implement GraphQL in [many different languages](/code/). For an in-depth learning experience with practical tutorials, visit the [How to GraphQL](https://www.howtographql.com) fullstack tutorial website. We have also partnered with edX to create a free online course, [Exploring GraphQL: A Query Language for APIs](https://www.edx.org/course/exploring-graphql-a-query-language-for-apis).


GraphQL 是一种 API 查询语言, 用于服务器端执行按已定义类型系统的查询. GraphQL 不与任何特定的数据库或存储引擎进行绑定, 而是由您的代码和数据支持.

通过定义类型和字段类型来创建 GraphQL 服务, 提供方法给每一个类型字段. 例如, 一个 GraphQL 服务, 告诉我们谁是登录用户(`me`), 用户信息可能是像这样显示:

```graphql
type Query {
  me: User
}

type User {
  id: ID
  name: String
}
```

为每个字段类型定义的函数:

```js
function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}
```

Once a GraphQL service is running (typically at a URL on a web service), it can receive GraphQL queries to validate and execute. A received query is first checked to ensure it only refers to the types and fields defined, then runs the provided functions to produce a result.

示例查询请求:

```graphql
{
  me {
    name
  }
}
```

可能处理得到的 JSON:

```json
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

Learn more about GraphQL — the query language, type system, how the GraphQL service works, as well as best practices for using GraphQL in the articles written in this section; they help to solve common problems.
