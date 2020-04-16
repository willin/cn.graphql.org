---
title: 查询和修改
layout: ../_core/DocsLayout
category: Learn
permalink: /learn/queries/
next: /learn/schema/
sublinks: Fields,Arguments,Aliases,Fragments,Operation Name,Variables,Directives,Mutations,Inline Fragments
---

在这一章节您将会学习如何向 GraphQL 服务器请求查询.

## Fields 字段

在 GraphQL 上最简单查询对象字段的方法. 我们先来看一下这个简单的查询和运行得到的结果:

```graphql
# { "graphiql": true }
{
  hero {
    name
  }
}
```

你可以立即看到查询与结果的形式完全相同. 这对于 GraphQL 是非常重要的, 因为你总是希望获得你所期待的内容, 并且服务器端明确知道客户端请求的具体字段.

`name`  字段返回 `String` 类型, 在这个示例里,是星球大战的英雄的名字 `"R2-D2"`.

> 对了,还有一件事: 上面的查询是*互动的*. 意味着你可以随意修改它并看到更新的结果. 尝试在 `hero` 对象中加入 `appearsIn` 字段的查询,并查看更新的结果.

在上面的例子里, 我们只是要求返回字符串格式的英雄名字, 字段也可以直接引用对象. 在这样的情况下, 你可以用 *子选择* 来约束该对象的字段. GraphQL 查询可以遍历相关对象及其字段, 让客户端在单一请求里获取更多的相关数据, 从而替代传统 REST 架构那样经过多次的服务器往返.

```graphql
# { "graphiql": true }
{
  hero {
    name
    # Queries can have comments!
    friends {
      name
    }
  }
}
```

请注意,在这个示例中, `friends` 字段返回的是一个数据的数组. GraphQL 查询对于单个项目或者项目列表看起来相同, 然而我们可以根据结构里指出的内容知道预期的结果.

## Arguments 参数

如果我们唯一能做的事情是遍历对象及其字段, GraphQL 则是已经是一个非常有用的数据提取语言. 当你添加了传递参数到字段的能力时,事情变得更加有趣了.

```graphql
# { "graphiql": true }
{
  human(id: "1000") {
    name
    height
  }
}
```

在一个类似 REST 的系统中, 你只能传递一组查询参数和URL字段作为请求的参数. 但在 GraphQL 中, 每一个嵌套对象的字段可以拥有各自的一组参数, 使得 GraphQL 成为完成多个 API 提取的替代. 你甚至可以传递参数到标量字段中, 以便在服务器上实现数据转换, 而不是分别在每个客户端上.

```graphql
# { "graphiql": true }
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

参数可以是很多不同的类型. 在上面的例子里, 我们使用了枚举类型, 其表示一组有限选项中的一个 (在此情况下, 长度单位无论是 `METER`米 还是 `FOOT`英尺). GraphQL 带有默认的类型, 只要可以将他们序列化为传输格式, GraphQL 服务器也可以自行申明自己的自定义类型.

[在这里阅读更多关于 GraphQL 类型系统.](/learn/schema)


## Aliases 别名

如果你的眼光尖锐, 应该已经注意到了, 由于结果的字段和查询中的字段名称匹配, 但不包括参数, 因此您不能直接使用不同的参数查询相同的字段. 这就是为什么你需要 _别名_ ,它能让你重新命名任何你想要的结果字段.

```graphql
# { "graphiql": true }
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

上面的例子中, 两个 `hero` 字段会引起冲突, 但由于我们可以将它们分别设置不同的别名, 所以可以在一个请求中获取这两个结果.

## Fragments 碎片

Let's say we had a relatively complicated page in our app, which let us look at two heroes side by side, along with their friends. You can imagine that such a query could quickly get complicated, because we would need to repeat the fields at least once - one for each side of the comparison.

这就是为什么 GraphQL 提供了成为 _fragments (碎片)_ 的可重用单元. 碎片允许你构建一组字段, 然后在你的查询里需要的地方引用它们. 这里有一个示例, 用碎片来解决上述的情形:

```graphql
# { "graphiql": true }
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

你可以看到上述查询中字段巧妙地进行了重复的使用. 碎片的概念经常用于将复杂的应用程序数据需求分解成更小的块, 尤其是在你需要合并 UI组件 中不同的碎片到一个初始化数据抓取时.

### Using variables inside fragments

It is possible for fragments to access variables declared in the query or mutation. See [variables](#variables).

```graphql
# { "graphiql": true }
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

## Operation name

Up until now, we have been using a shorthand syntax where we omit both the `query` keyword and the query name, but in production apps it's useful to use these to make our code less ambiguous.

Here’s an example that includes the keyword `query` as _operation type_ and `HeroNameAndFriends` as _operation name_ :

```graphql
# { "graphiql": true }
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```

The _operation type_ is either _query_, _mutation_, or _subscription_ and describes what type of operation you're intending to do. The operation type is required unless you're using the query shorthand syntax, in which case you can't supply a name or variable definitions for your operation.

The _operation name_ is a meaningful and explicit name for your operation. It is only required in multi-operation documents, but its use is encouraged because it is very helpful for debugging and server-side logging. 
When something goes wrong (you see errors either in your network logs, or in the logs of your GraphQL server) it is easier to identify a query in your codebase by name instead of trying to decipher the contents.
Think of this just like a function name in your favorite programming language. 
For example, in JavaScript we can easily work only with anonymous functions, but when we give a function a name, it's easier to track it down, debug our code, 
and log when it's called. In the same way, GraphQL query and mutation names, along with fragment names, can be a useful debugging tool on the server side to identify 
different GraphQL requests.

到目前为止, 我们一直在查询字符串中写入所有的参数. 但实际上大多数应用, 参数的字段可能是动态的. 例如, 可能会有一个下拉列表, 让你选择你所感兴趣的星球大战插曲, 或一个搜索字段, 或一组过滤器.


直接在查询语句中传递动态变量不是一种好的做法, 因为我们的客户端代码需要在运行时动态的去处理这些查询语句, 并且将其序列化为 GraphQL 指定的格式. 作为替代, GraphQL提供将动态值从查询中抽离,并且单独作为一个字段传入的一级方法. 这些值成为 _变量_.

当我们开始使用变量时, 我们需要做三件事情:

1. 用 `$变量名` 来替代查询中的静态值
2. 申明 `$变量名` 作为查询所接收的一个变量
3. 单独传递 `变量名: 值` , 或传递特定格式(通常是 JSON)的变量字典

看起来是这个样子的:

```graphql
# { "graphiql": true, "variables": { "episode": "JEDI" } }
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

现在, 在我们客户端的代码中, 我们可以简单传递一些不同的变量, 而不需要去重构整个查询语句. 这通常是表达查询中动态参数的最佳实践,我们不应该使用字符串插值的方法来重构查询语句.

### 变量定义

The variable definitions are the part that looks like `($episode: Episode)` in the query above. It works just like the argument definitions for a function in a typed language. It lists all of the variables, prefixed by `$`, followed by their type, in this case `Episode`.

All declared variables must be either scalars, enums, or input object types. So if you want to pass a complex object into a field, you need to know what input type that matches on the server. Learn more about input object types on the Schema page.

Variable definitions can be optional or required. In the case above, since there isn't an `!` next to the `Episode` type, it's optional. But if the field you are passing the variable into requires a non-null argument, then the variable has to be required as well.

To learn more about the syntax for these variable definitions, it's useful to learn the GraphQL schema language. The schema language is explained in detail on the Schema page.


### Default variables

Default values can also be assigned to the variables in the query by adding the default value after the type declaration. 

```graphql
query HeroNameAndFriends($episode: Episode = JEDI) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

When default values are provided for all variables, you can call the query without passing any variables. If any variables are passed as part of the variables dictionary, they will override the defaults. 

## Directives

We discussed above how variables enable us to avoid doing manual string interpolation to construct dynamic queries. Passing variables in arguments solves a pretty big class of these problems, but we might also need a way to dynamically change the structure and shape of our queries using variables. For example, we can imagine a UI component that has a summarized and detailed view, where one includes more fields than the other.

Let's construct a query for such a component:

```graphql
# { "graphiql": true, "variables": { "episode": "JEDI", "withFriends": false } }
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

Try editing the variables above to instead pass `true` for `withFriends`, and see how the result changes.

We needed to use a new feature in GraphQL called a _directive_. A directive can be attached to a field or fragment inclusion, and can affect execution of the query in any way the server desires. The core GraphQL specification includes exactly two directives, which must be supported by any spec-compliant GraphQL server implementation:

- `@include(if: Boolean)` Only include this field in the result if the argument is `true`.
- `@skip(if: Boolean)` Skip this field if the argument is `true`.

Directives can be useful to get out of situations where you otherwise would need to do string manipulation to add and remove fields in your query. Server implementations may also add experimental features by defining completely new directives.


## Mutations 转变

Most discussions of GraphQL focus on data fetching, but any complete data platform needs a way to modify server-side data as well.

In REST, any request might end up causing some side-effects on the server, but by convention it's suggested that one doesn't use `GET` requests to modify data. GraphQL is similar - technically any query could be implemented to cause a data write. However, it's useful to establish a convention that any operations that cause writes should be sent explicitly via a mutation.

Just like in queries, if the mutation field returns an object type, you can ask for nested fields. This can be useful for fetching the new state of an object after an update. Let's look at a simple example mutation:

```graphql
# { "graphiql": true, "variables": { "ep": "JEDI", "review": { "stars": 5, "commentary": "This is a great movie!" } } }
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

Note how `createReview` field returns the `stars` and `commentary` fields of the newly created review. This is especially useful when mutating existing data, for example, when incrementing a field, since we can mutate and query the new value of the field with one request.

You might also notice that, in this example, the `review` variable we passed in is not a scalar. It's an _input object type_, a special kind of object type that can be passed in as an argument. Learn more about input types on the Schema page.

### Multiple fields in mutations

A mutation can contain multiple fields, just like a query. There's one important distinction between queries and mutations, other than the name:

**While query fields are executed in parallel, mutation fields run in series, one after the other.**

This means that if we send two `incrementCredits` mutations in one request, the first is guaranteed to finish before the second begins, ensuring that we don't end up with a race condition with ourselves.


## Inline Fragments 行内碎片

Like many other type systems, GraphQL schemas include the ability to define interfaces and union types. [Learn about them in the schema guide.](/learn/schema/#interfaces)

If you are querying a field that returns an interface or a union type, you will need to use *inline fragments* to access data on the underlying concrete type. It's easiest to see with an example:

```graphql
# { "graphiql": true, "variables": { "ep": "JEDI" } }
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```

In this query, the `hero` field returns the type `Character`, which might be either a `Human` or a `Droid` depending on the `episode` argument. In the direct selection, you can only ask for fields that exist on the `Character` interface, such as `name`.

To ask for a field on the concrete type, you need to use an _inline fragment_ with a type condition. Because the first fragment is labeled as `... on Droid`, the `primaryFunction` field will only be executed if the `Character` returned from `hero` is of the `Droid` type. Similarly for the `height` field for the `Human` type.

Named fragments can also be used in the same way, since a named fragment always has a type attached.


### Meta fields

Given that there are some situations where you don't know what type you'll get back from the GraphQL service, you need some way to determine how to handle that data on the client. GraphQL allows you to request `__typename`, a meta field, at any point in a query to get the name of the object type at that point.

```graphql
# { "graphiql": true}
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

In the above query, `search` returns a union type that can be one of three options. It would be impossible to tell apart the different types from the client without the `__typename` field.

GraphQL services provide a few meta fields, the rest of which are used to expose the [Introspection](../introspection/) system.

