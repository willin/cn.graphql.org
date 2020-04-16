/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('../_core/Site');
var Marked = require('../_core/Marked');

export default ({ page, site }) =>
  <Site section="code" title="Code" page={page}>

    <section>
      <div className="documentationContent">
        <div className="inner-content">
          <h1>开发</h1>
          <Marked>{`

GraphQL 支持许多不同的开发语言. 这个列表包含了一些更流行的服务器端框架,客户端库和一些有用的小东西.

## 服务器端库

除了 GraphQL [参考 JavaScript 实现](#javascript), 服务器端库包括:

- [C# / .NET](#c-net)
- [Clojure](#clojure)
- [Elixir](#elixir)
- [Erlang](#erlang)
- [Go](#go)
- [Java](#java)
- [JavaScript](#javascript)
- [PHP](#php)
- [Python](#python)
- [Scala](#scala)
- [Ruby](#ruby)

### C# / .NET

  - [graphql-dotnet](https://github.com/graphql-dotnet/graphql-dotnet): GraphQL for .NET
  - [graphql-net](https://github.com/ckimes89/graphql-net): 将 GraphQL 转换成 IQueryable

### Clojure

#### [alumbra](https://github.com/alumbra/alumbra)

适用于 Clojure 的一组可重用的 GraphQL 组件, 符合 [alumbra.spec](https://github.com/alumbra/alumbra.spec) 的数据结构。

\`\`\`clojure
(require '[alumbra.core :as alumbra]
         '[claro.data :as data])

(def schema
  "type Person { name: String!, friends: [Person!]! }
   type QueryRoot { person(id: ID!): Person, me: Person! }
   schema { query: QueryRoot }")

(defrecord Person [id]
  data/Resolvable
  (resolve! [_ _]
    {:name    (str "Person #" id)
     :friends (map ->Person  (range (inc id) (+ id 3)))}))

(def QueryRoot
  {:person (map->Person {})
   :me     (map->Person {:id 0})})

(def app
  (alumbra/handler
    {:schema schema
     :query  QueryRoot}))

(defonce my-graphql-server
  (aleph.http/start-server #'app {:port 3000}))
\`\`\`

\`\`\`bash
$ curl -XPOST "http://0:3000" -H'Content-Type: application/json' -d'{
  "query": "{ me { name, friends { name } } }"
}'
{"data":{"me":{"name":"Person #0","friends":[{"name":"Person #1"},{"name":"Person #2"}]}}}
\`\`\`

#### [graphql-clj](https://github.com/tendant/graphql-clj)

提供 GraphQL 实现的 Clojure 库。


用 \`graphql-clj\` 实现的 Hello World 代码:

\`\`\`clojure

(def schema "type QueryRoot {
    hello: String
  }")

(defn resolver-fn [type-name field-name]
  (get-in {"QueryRoot" {"hello" (fn [context parent & rest]
                              "Hello world!")}}
          [type-name field-name]))

(require '[graphql-clj.executor :as executor])

(executor/execute nil schema resolver-fn "{ hello }")
\`\`\`

  - [lacinia](https://github.com/walmartlabs/lacinia): 全面实施GraphQL规范, 旨在保持外部遵守规范.

### Elixir

  - [absinthe](https://github.com/absinthe-graphql/absinthe): GraphQL for Elixir.
  - [graphql-elixir](https://github.com/graphql-elixir/graphql): Facebook GraphQL Elixir.

### Erlang

  - [graphql-erlang](https://github.com/shopgun/graphql-erlang): GraphQL for Erlang.

### Go

  - [graphql-go](https://github.com/graphql-go/graphql): Go / Golang 的 GraphQL 的实现.
  - [graphql-relay-go](https://github.com/graphql-go/relay): 一个Go / Golang 库, 用于构建支持反应 react-relay 的 graphql-go 服务器.
  - [neelance/graphql-go](https://github.com/neelance/graphql-go): Golang 活跃的 GraphQL 实现.

### Java

#### [graphql-java](https://github.com/graphql-java/graphql-java)

用于构建GraphQL API的Java库.

用 \`graphql-java\` 实现的 hello world 代码:

\`\`\`java
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.StaticDataFetcher;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

import static graphql.schema.idl.RuntimeWiring.newRuntimeWiring;

public class HelloWorld {

    public static void main(String[] args) {
        String schema = "type Query{hello: String} schema{query: Query}";

        SchemaParser schemaParser = new SchemaParser();
        TypeDefinitionRegistry typeDefinitionRegistry = schemaParser.parse(schema);

        RuntimeWiring runtimeWiring = newRuntimeWiring()
                .type("Query", builder -> builder.dataFetcher("hello", new StaticDataFetcher("world")))
                .build();

        SchemaGenerator schemaGenerator = new SchemaGenerator();
        GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeDefinitionRegistry, runtimeWiring);

        GraphQL build = GraphQL.newGraphQL(graphQLSchema).build();
        ExecutionResult executionResult = build.execute("{hello}");

        System.out.println(executionResult.getData().toString());
        // Prints: {hello=world}
    }
}
\`\`\`

有关设置的更多信息, 请参阅 [graphql-java文档](https://github.com/graphql-java/graphql-java).

### JavaScript

#### [GraphQL.js](/graphql-js/) ([github](https://github.com/graphql/graphql-js/)) ([npm](https://www.npmjs.com/package/graphql))

GraphQL 规范的参考实现, 专为在 Node.js 环境中运行 GraphQL 而设计.

通过 命令行 执行 \`GraphQL.js\` hello world 脚本:

\`\`\`bash
npm install graphql
\`\`\`

然后执行 \`node hello.js\`.

\`hello.js\`源码:

\`\`\`js
var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(\`
  type Query {
    hello: String
  }
\`);

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
\`\`\`

#### [express-graphql](/graphql-js/running-an-express-graphql-server/) ([github](https://github.com/graphql/express-graphql)) ([npm](https://www.npmjs.com/package/express-graphql))

通过 Express 实现的 GraphQL 参考实现, 你可以联合 Express 运行或独立运行.

运行一个 \`express-graphql\` hello world 服务器:

\`\`\`bash
npm install express express-graphql graphql
\`\`\`

然后执行 \`node server.js\`.

\`server.js\` 源码:

\`\`\`js
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(\`
  type Query {
    hello: String
  }
\`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
\`\`\`

#### [graphql-server](http://dev.apollodata.com/tools/graphql-server/index.html) ([github](https://github.com/apollostack/graphql-server)) ([npm](https://www.npmjs.com/package/graphql-server-express))

一组来自 Apollo 的 GraphQL 服务器软件包, 可与各种Node.js HTTP框架（Express, Connect, Hapi, Koa等）配合工作.

运行一个 graphql-server-express hello world:

\`\`\`bash
npm install graphql-server-express body-parser express graphql graphql-tools
\`\`\`

然后运行 \`node server.js\`.

\`server.js\`源码:

\`\`\`js
var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var typeDefs = [\`
type Query {
  hello: String
}

schema {
  query: Query
}\`];

var resolvers = {
  Query: {
    hello(root) {
      return 'world';
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));
\`\`\`

GraphQL Server 还支持所有 Node.js HTTP 服务器框架: Express, Connect, HAPI 和 Koa.

### PHP

  - [graphql-php](https://github.com/webonyx/graphql-php): GraphQL 的 PHP 实现
  - [graphql-relay-php](https://github.com/ivome/graphql-relay-php): 一个帮助构建 GraphQL PHP服务器实现(支持 react-relay)的库.

### Python

#### [Graphene](http://graphene-python.org/) ([github](https://github.com/graphql-python/graphene))

用于构建 GraphQL API 的 Python 库.

运行 Graphene hello world 脚本:

\`\`\`bash
pip install graphene
\`\`\`

然后运行 \`python hello.py\`.

\`hello.py\` 源码:

\`\`\`python
import graphene

class Query(graphene.ObjectType):
  hello = graphene.String()

  def resolve_hello(self, args, context, info):
    return 'Hello world!'

schema = graphene.Schema(query=Query)
result = schema.execute('{ hello }')
print(result.data['hello'])
\`\`\`

能够很好的绑定: [Relay](https://facebook.github.io/relay/), Django, SQLAlchemy, 和 Google App Engine.

### Ruby

#### [graphql-ruby](https://github.com/rmosolgo/graphql-ruby)

用于构建 GraphQL API 的 Ruby 库.

运行 \`graphql-ruby\` 的 hello world 脚本:

\`\`\`bash
gem install graphql
\`\`\`

然后执行 \`ruby hello.rb\`.

\`hello.rb\` 源码:

\`\`\`ruby
require 'graphql'

QueryType = GraphQL::ObjectType.define do
  name 'Query'
  field :hello do
    type types.String
    resolve -> (obj, args, ctx) { 'Hello world!' }
  end
end

Schema = GraphQL::Schema.define do
  query QueryType
end

puts Schema.execute('{ hello }')
\`\`\`

Relay 和 Rails 也很好的支持绑定.

### Scala

#### [Sangria](http://sangria-graphql.org/) ([github](https://github.com/sangria-graphql/sangria)): 支持 [Relay](https://facebook.github.io/relay/) 的 Scala GraphQL 库.

用 \`sangria\` 实现的一个模型和查询 hello world:

\`\`\`scala
import sangria.schema._
import sangria.execution._
import sangria.macros._

val QueryType = ObjectType("Query", fields[Unit, Unit](
  Field("hello", StringType, resolve = _ ⇒ "Hello world!")
))

val schema = Schema(QueryType)

val query = graphql"{ hello }"

Executor.execute(schema, query) map println
\`\`\`

## GraphQL Clients

- [C# / .NET](#c-net-1)
- [Go](#go-1)
- [Java / Android](#java-android)
- [JavaScript](#javascript-1)
- [Swift / Objective-C iOS](#swift-objective-c-ios)

### C# / .NET

  - [graphql-net-client](https://github.com/bkniffler/graphql-net-client): .NET GraphQL 客户端的基本示例.

### Go

  - [graphql](https://github.com/shurcooL/graphql#readme): A GraphQL client implementation in Go.

### Java / Android

  - [Apollo Android](https://github.com/apollographql/apollo-android): Java 实现支持强类型和缓存的 GraphQL 客户端.

### JavaScript

  - [Relay](https://facebook.github.io/relay/) ([github](https://github.com/facebook/relay)) ([npm](https://www.npmjs.com/package/react-relay)): Facebook 构建的与 GraphQL 后端通信的 React 应用程序框架.
  - [Apollo Client](http://dev.apollodata.com/react/) ([github](https://github.com/apollostack/apollo-client)): 强大的JavaScript GraphQL客户端, 旨在与React, React Native, Angular 2或简单的 JavaScript 一起工作.
  - [graphql-request](https://github.com/graphcool/graphql-request): 以个简单可扩展的 Javascript GraphQL 客户端可以在任何 js 环境运行(包括浏览器, Node.js, 和 React Native) - 由轻量级 \`fetch\` 包裹而成.
  - [Lokka](https://github.com/kadirahq/lokka): 一个简单的JavaScript GraphQL客户端, 适用于所有JavaScript环境 - 浏览器, Node.js和React Native.
  - [nanogql](https://github.com/yoshuawuyts/nanogql): 模块化精简的 GraphQL 客户端类库.

### Swift / Objective-C iOS

  - [Apollo iOS](http://dev.apollodata.com/ios/) ([github](https://github.com/apollostack/apollo-ios)): 用于iOS的GraphQL客户端, 以特定于查询的Swift类型返回结果, 并与Xcode集成, 并行显示Swift源和GraphQL, 并具有内联错误验证.
  - [GraphQL iOS](https://github.com/funcompany/graphql-ios): 一个 Objective-C 实现的 GraphQL iOS客户端.


## 工具

  - [graphiql](https://github.com/graphql/graphiql) ([npm](https://www.npmjs.com/package/graphiql)): 一种交互式浏览器 GraphQL IDE.
  - [libgraphqlparser](https://github.com/graphql/libgraphqlparser): C/C++ API 查询解析器.
  - [Graphql Language Service](https://github.com/graphql/graphql-language-service): 构建 GraphQL 语言服务的交互IDE(包含诊断, 自动补全等).

## Services

  - [Apollo Optics](http://www.apollodata.com/optics/): 一个 GraphQL 后端性能和用量监控的服务.
  - [GraphCMS](https://graphcms.com/): 一个基于 BaaS (Backend as a Service)和 GraphQL 的内容编辑和创作工具服务.
  - [Graphcool](https://www.graph.cool) ([github](https://github.com/graphcool)): 一个基于 BaaS (Backend as a Service) 提供 GraphQL 应用后台的服务, 具有强大的管理Web UI界面.
  - [Reindex](https://www.reindex.io/baas/) ([github](https://github.com/reindexio/reindex-js)): 一个基于 BaaS (Backend as a Service) 针对 React 和 Relay 的应用程序 GraphQL 后端服务.
  - [Scaphold](https://scaphold.io) ([github](https://github.com/scaphold-io)): 一个基于 BaaS (Backend as a Service) 可以集成各种不同应用的 GraphQL 后端服务.


## 更多

  - [awesome-graphql](https://github.com/chentsulin/awesome-graphql): 一个梦幻般的社区维护图书馆, 资源等的收藏.

          `}</Marked>

        </div>
      </div>
    </section>

  </Site>
