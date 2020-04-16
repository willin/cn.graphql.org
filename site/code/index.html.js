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
- [Groovy](#groovy)
- [Java](#java)
- [JavaScript](#javascript)
- [Julia](#julia)
- [Kotlin](#kotlin)
- [Perl](#perl)
- [PHP](#php)
- [Python](#python)
- [R](#r)
- [Ruby](#ruby)
- [Rust](#rust)
- [Scala](#scala)
- [Swift](#swift)

### C# / .NET

#### [graphql-dotnet](https://github.com/graphql-dotnet/graphql-dotnet): GraphQL for .NET

\`\`\`csharp
using System;
using GraphQL;
using GraphQL.Types;

public class Program
{
  public static void Main(string[] args)
  {
    var schema = Schema.For(@"
      type Query {
        hello: String
      }
    ");

    var json = schema.Execute(_ =>
    {
      _.Query = "{ hello }";
      _.Root = new { Hello = "Hello World!" };
    });

    Console.WriteLine(json);
  }
}                   
\`\`\`

  - [graphql-net](https://github.com/ckimes89/graphql-net): Convert GraphQL to IQueryable
  - [Entity GraphQL](https://github.com/lukemurray/EntityGraphQL): .NET Core GraphQL library. Compiles to IQueryable to easily expose a schema from an existing data model (E.g. from an Entity Framework data model)
  - [DotNetGraphQLQueryGen](https://github.com/lukemurray/DotNetGraphQLQueryGen): .NET Core library to generate classes from a GraphQL schema for type-safe querying in dotnet
  - [Hot Chocolate](https://github.com/ChilliCream/hotchocolate): GraphQL Server for .NET core and .NET classic

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

#### [lacinia](https://github.com/walmartlabs/lacinia)

A full implementation of the GraphQL specification that aims to maintain external compliance with the specification.

### Elixir

  - [absinthe](https://github.com/absinthe-graphql/absinthe): GraphQL for Elixir.
  - [graphql-elixir](https://github.com/graphql-elixir/graphql): Facebook GraphQL Elixir.

### Erlang

  - [graphql-erlang](https://github.com/shopgun/graphql-erlang): GraphQL for Erlang.

### Go

  - [graphql-go](https://github.com/graphql-go/graphql): An implementation of GraphQL for Go / Golang.
  - [graph-gophers/graphql-go](https://github.com/graph-gophers/graphql-go): An active implementation of GraphQL in Golang (was https://github.com/neelance/graphql-go).
  - [99designs/gqlgen](https://github.com/99designs/gqlgen) - Go generate based graphql server library.
  - [graphql-relay-go](https://github.com/graphql-go/relay): A Go/Golang library to help construct a graphql-go server supporting react-relay.
  - [machinebox/graphql](https://github.com/machinebox/graphql): An elegant low-level HTTP client for GraphQL.
  - [samsarahq/thunder](https://github.com/samsarahq/thunder): A GraphQL implementation with easy schema building, live queries, and batching.
  - [appointy/jaal](https://github.com/appointy/jaal): Develop spec compliant GraphQL servers in Go.

### Groovy

#### [gorm-graphql](https://github.com/grails/gorm-graphql/)

**Core Library** - The GORM GraphQL library provides functionality to generate a GraphQL schema based on your GORM entities. In addition to mapping domain classes to a GraphQL schema, the core library also provides default implementations of "data fetchers" to query, update, and delete data through executions of the schema.

**Grails Plugin** - In a addition to the Core Library, the GORM GraphQL Grails Plugin:

- Provides a controller to receive and respond to GraphQL requests through HTTP, based on their guidelines.
- Generates the schema at startup with spring bean configuration to make it easy to extend.
- Includes a [GraphiQL](https://github.com/graphql/graphiql) browser enabled by default in development. The browser is accessible at /graphql/browser.
- Overrides the default data binder to use the data binding provided by Grails
- Provides a [trait](https://grails.github.io/gorm-graphql/latest/api/org/grails/gorm/graphql/plugin/testing/GraphQLSpec.html) to make integration testing of your GraphQL endpoints easier

See [the documentation](https://grails.github.io/gorm-graphql/latest/guide/index.html) for more information.

#### [GQL](https://grooviter.github.io/gql/)

GQL is a Groovy library for GraphQL

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

        RuntimeWiring runtimeWiring = new RuntimeWiring()
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

#### [apollo-server](https://www.apollographql.com/docs/apollo-server/) ([github](https://github.com/apollographql/apollo-server)) ([npm](https://www.npmjs.com/package/apollo-server-express))

一组来自 Apollo 的 GraphQL 服务器软件包, 可与各种Node.js HTTP框架（Express, Connect, Hapi, Koa等）配合工作.

To run a hello world server with apollo-server-express:

\`\`\`bash
npm install apollo-server-express express 
\`\`\`

然后运行 \`node server.js\`.

\`server.js\`源码:

\`\`\`js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
\`\`\`

Apollo Server also supports all Node.js HTTP server frameworks: Express, Connect, HAPI, Koa and NestJs.

### Kotlin

  - [graphql-kotlin](https://github.com/ExpediaGroup/graphql-kotlin/): A set of libraries for running GraphQL server in Kotlin.

### Perl

  - [graphql-perl](https://github.com/graphql-perl/graphql-perl): A Perl port of GraphQL reference implementation
    - [MetaCPAN documentation](https://metacpan.org/pod/GraphQL)
    - [Mojolicious-Plugin-GraphQL](https://github.com/graphql-perl/Mojolicious-Plugin-GraphQL) - connect your GraphQL service to a Mojolicious app
    - [GraphQL-Plugin-Convert-DBIC](https://github.com/graphql-perl/GraphQL-Plugin-Convert-DBIC) - automatically connect your DBIx::Class schema to GraphQL
    - [GraphQL-Plugin-Convert-OpenAPI](https://github.com/graphql-perl/GraphQL-Plugin-Convert-OpenAPI) - automatically connect any OpenAPI service (either local Mojolicious one, or remote) to GraphQL

### PHP

  - [graphql-php](https://github.com/webonyx/graphql-php): A PHP port of GraphQL reference implementation
  - [graphql-relay-php](https://github.com/ivome/graphql-relay-php): A library to help construct a graphql-php server supporting react-relay.
  - [Railt](https://github.com/railt/railt): A PHP GraphQL Framework.
  - [Lighthouse](https://github.com/nuwave/lighthouse): A GraphQL server for Laravel
  - [GraphQLBundle](https://github.com/overblog/GraphQLBundle): A GraphQL server for Symfony
  - [WPGraphQL](https://github.com/wp-graphql/wp-graphql): A free, open-source WordPress plugin that provides an extendable GraphQL schema and API for any WordPress site 

#### [API Platform](https://api-platform.com) ([github](https://github.com/api-platform/api-platform))

API Platform is a fully-featured, flexible and extensible API framework built on top of Symfony.
The following class is enough to create both a Relay-compatible GraphQL server and a hypermedia API supporting modern REST formats (JSON-LD, JSONAPI...):

\`\`\`php
<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Greet someone!
 *
 * @ApiResource
 * @ORM\Entity
 */
class Greeting
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     */
    public $id;

    /**
     * @var string Your nice message
     *
     * @ORM\Column
     */
    public $hello;
}
\`\`\`

Other API Platform features include data validation, authentication, authorization, deprecations, cache and GraphiQL integration.

#### [GraphQLite](https://graphqlite.thecodingmachine.io) ([github](https://github.com/thecodingmachine/graphqlite))

GraphQLite is a library that offers an annotations-based syntax for GraphQL schema definition.
It is framework agnostic with bindings available for Symfony and Laravel.

This code declares a "product" query and a "Product" Type:

\`\`\`php
class ProductController
{
    /**
     * @Query()
     */
    public function product(string $id): Product
    {
        // Some code that looks for a product and returns it.
    }
}

/**
 * @Type()
 */
class Product
{
    /**
     * @Field()
     */
    public function getName(): string
    {
        return $this->name;
    }
    // ...
}
\`\`\`

Other GraphQLite features include validation, security, error handling, loading via data-loader pattern...

#### [Siler](https://siler.leocavalcante.com/graphql/) ([github](https://github.com/leocavalcante/siler))

Siler is a PHP library powered with high-level abstractions to work with GraphQL.

To run a Siler hello world script:

\`\`\`graphql
type Query {
  hello: String
}
\`\`\`

\`\`\`php
<?php
declare(strict_types=1);
require_once '/path/to/vendor/autoload.php';

use Siler\Diactoros;
use Siler\Graphql;
use Siler\Http;

$typeDefs = file_get_contents(__DIR__.'/schema.graphql');
$resolvers = [
    'Query' => [
        'hello' => 'world',
    ],
];
$schema = Graphql\schema($typeDefs, $resolvers);

echo "Server running at http://127.0.0.1:8080";

Http\server(Graphql\psr7($schema), function (\Throwable $err) {
    var_dump($err);
    return Diactoros\json([
        'error'   => true,
        'message' => $err->getMessage(),
    ]);
})()->run();
\`\`\`

It also provides functionality for the construction of a WebSocket Subscriptions Server based on how Apollo works.

### Swift

  - [Graphiti](https://github.com/GraphQLSwift/Graphiti): Swift library for building GraphQL schemas/types fast, safely and easily.

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
  hello = graphene.String(name=graphene.String(default_value="World"))

  def resolve_hello(self, info, name):
    return 'Hello ' + name

schema = graphene.Schema(query=Query)
result = schema.execute('{ hello }')
print(result.data['hello']) # "Hello World"
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

class QueryType < GraphQL::Schema::Object
  graphql_name 'Query'
  field :hello do
    type types.String
    resolve -> (obj, args, ctx) { 'Hello world!' }
  end
end

class Schema < GraphQL::Schema
  query QueryType
end

puts Schema.execute('{ hello }').to_json
\`\`\`

Relay 和 Rails 也很好的支持绑定.

#### [Agoo](https://github.com/ohler55/agoo)

A high performance web server with support for GraphQL. Agoo strives for a simple, easy to use API for GraphQL.

\`\`\`ruby
require 'agoo'

class Query
  def hello
    'hello'
  end
end

class Schema
  attr_reader :query

  def initialize
    @query = Query.new()
  end
end

Agoo::Server.init(6464, 'root', thread_count: 1, graphql: '/graphql')
Agoo::Server.start()
Agoo::GraphQL.schema(Schema.new) {
  Agoo::GraphQL.load(%^type Query { hello: String }^)
}
sleep

# To run this GraphQL example type the following then go to a browser and enter
# a URL of localhost:6464/graphql?query={hello}
#
# ruby hello.rb
\`\`\`

### Rust

 - [graphql-rust/juniper](https://github.com/graphql-rust/juniper): GraphQL server library for Rust

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
- [Clojurescript](#clojurescript-1)
- [Elm](#elm)
- [Flutter](#flutter)
- [Go](#go-1)
- [Java / Android](#java-android)
- [JavaScript](#javascript-1)
- [Julia](#julia)
- [Swift / Objective-C iOS](#swift-objective-c-ios)
- [Python](#python-1)
- [R](#r)

### C# / .NET

  - [GraphQL.Client](https://github.com/graphql-dotnet/graphql-client): A GraphQL Client for .NET.
  - [graphql-net-client](https://github.com/bkniffler/graphql-net-client): Basic example GraphQL client for .NET.
  - [SAHB.GraphQLClient](https://github.com/sahb1239/SAHB.GraphQLClient): GraphQL client which supports generating queries from C# classes

### Clojurescript

  - [re-graph](https://github.com/oliyh/re-graph/): A GraphQL client implemented in Clojurescript with support for websockets.

### Elm
  
  - [dillonkearns/elm-graphql](https://github.com/dillonkearns/elm-graphql): Library and command-line code generator to create type-safe Elm code for a GraphQL endpoint.

### Flutter

  - [graphql](https://github.com/zino-app/graphql-flutter#readme): A GraphQL client implementation in Flutter.

### Go

  - [graphql](https://github.com/shurcooL/graphql#readme): A GraphQL client implementation in Go.

### Java / Android

  - [Apollo Android](https://github.com/apollographql/apollo-android): Java 实现支持强类型和缓存的 GraphQL 客户端.

  - [Nodes](https://github.com/americanexpress/nodes): A GraphQL JVM Client designed for constructing queries from standard model definitions. By American Express.

### JavaScript

  - [Relay](https://facebook.github.io/relay/) ([github](https://github.com/facebook/relay)) ([npm](https://www.npmjs.com/package/react-relay)): Facebook's framework for building React applications that talk to a GraphQL backend.
  - [Apollo Client](http://apollographql.com/client/) ([github](https://github.com/apollographql/apollo-client)): A powerful JavaScript GraphQL client, designed to work well with React, React Native, Angular 2, or just plain JavaScript.
  - [graphql-request](https://github.com/prisma/graphql-request): A simple and flexible JavaScript GraphQL client that works in all JavaScript environments (the browser, Node.js, and React Native) - basically a lightweight wrapper around \`fetch\`.
  - [Lokka](https://github.com/kadirahq/lokka): A simple JavaScript GraphQL client that works in all JavaScript environments (the browser, Node.js, and React Native).
  - [nanogql](https://github.com/yoshuawuyts/nanogql): Tiny GraphQL client library using template strings.
  - [gq-loader](https://github.com/Houfeng/gq-loader): A simple JavaScript GraphQL client，Let the *.gql file be used as a module through webpack loader.
  - [AWS Amplify](https://aws.github.io/aws-amplify): A JavaScript library for application development using cloud services, which supports GraphQL backend and React components for working with GraphQL data.
  - [Grafoo](https://github.com/grafoojs/grafoo): An all purpose GraphQL client with view layer integrations for multiple frameworks in just 1.6kb.
  - [urql](https://formidable.com/open-source/urql/) ([github](https://github.com/FormidableLabs/urql)): A highly customizable and versatile GraphQL client for React.
  - [graphqurl](https://github.com/hasura/graphqurl) ([npm](https://www.npmjs.com/package/graphqurl)): curl for GraphQL with autocomplete, subscriptions and GraphiQL. Also a dead-simple universal javascript GraphQL client.

### Julia

  - [Diana.jl](https://github.com/codeneomatrix/Diana.jl): A Julia GraphQL server implementation.

### Swift / Objective-C iOS

  - [Apollo iOS](https://www.apollographql.com/docs/ios/) ([github](https://github.com/apollographql/apollo-ios)): A GraphQL client for iOS that returns results as query-specific Swift types, and integrates with Xcode to show your Swift source and GraphQL side by side, with inline validation errors.
  - [GraphQL iOS](https://github.com/funcompany/graphql-ios): An Objective-C GraphQL client for iOS.
  - [Graphaello](https://github.com/nerdsupremacist/Graphaello): A Tool for Writing Declarative, Type-Safe and Data-Driven Applications in SwiftUI using GraphQL and Apollo

### Python

  - [GQL](https://github.com/graphql-python/gql): A GraphQL client in Python.
  - [python-graphql-client](https://github.com/prisma/python-graphql-client): Simple GraphQL client for Python 2.7+.
  - [sgqlc](https://github.com/profusion/sgqlc): A simple Python GraphQL client. Supports generating code generation for types defined in a GraphQL schema.

### R

  - [ghql](https://github.com/ropensci/ghql): General purpose GraphQL R client.


  - [graphiql](https://github.com/graphql/graphiql) ([npm](https://www.npmjs.com/package/graphiql)): An interactive in-browser GraphQL IDE.
  - [libgraphqlparser](https://github.com/graphql/libgraphqlparser): A GraphQL query language parser in C++ with C and C++ APIs.
  - [Graphql Language Service](https://github.com/graphql/graphql-language-service): An interface for building GraphQL language services for IDEs (diagnostics, autocomplete etc).
  - [quicktype](https://quicktype.io) ([github](https://github.com/quicktype/quicktype)): Generate types for GraphQL queries in TypeScript, Swift, golang, C#, C++, and more.
  - [GraphQL Code Generator](https://graphql-code-generator.com): GraphQL code generator with flexible support for custom plugins and templates like Typescript (frontend and backend), React Hooks, resolvers signatures and more.
  - [GraphQL Inspector](https://github.com/kamilkisiela/graphql-inspector): Compare schemas, validate documents, find breaking changes, find similar types, schema coverage, and more.
  - [GraphQL Config](https://github.com/kamilkisiela/graphql-config): One configuration for all your GraphQL tools (supported by most tools, editors & IDEs).
  - [GraphQL CLI](https://github.com/urigo/graphql-cli): A command line tool for common GraphQL development workflows.
  - [GraphQL Scalars](https://github.com/Urigo/graphql-scalars): A library of custom GraphQL scalar types for creating precise, type-safe GraphQL schemas.
  - [GraphQL Toolkit](https://github.com/ardatan/graphql-toolkit): A set of utils for faster development of GraphQL tools (Schema and documents loading, Schema merging and more).
  - [SOFA](https://github.com/Urigo/sofa): Generate REST API from your GraphQL API.

## Services

  - [Apollo Graph Manager](https://engine.apollographql.com): A cloud service for monitoring the performance and usage of your GraphQL backend.
  - [GraphCMS](https://graphcms.com/): A BaaS (Backend as a Service) that sets you up with a GraphQL backend as well as tools for content editors to work with the stored data.
  - [Prisma](https://www.prisma.io) ([github](https://github.com/prisma)): A BaaS (Backend as a Service) providing a GraphQL backend for your applications with a powerful web ui for managing your database and stored data.
  - [Tipe](https://tipe.io) ([github](https://github.com/tipeio)): A SaaS (Software as a Service) content management system that allows you to create your content with powerful editing tools and access it from anywhere with a GraphQL or REST API.
  - [AWS AppSync](https://aws.amazon.com/appsync/): Fully managed GraphQL service with realtime subscriptions, offline programming & synchronization, and enterprise security features as well as fine grained authorization controls.
  - [Elide](https://elide.io): A Java library that can expose a JPA annotated data model as a GraphQL service over any relational database. 
  - [Hasura](https://hasura.io) ([github](https://github.com/hasura)): Hasura connects to your databases & microservices and instantly gives you a production-ready GraphQL API.
  - [FaunaDB](https://docs.fauna.com/fauna/current/graphql): Create an instant GraphQL backend by importing a gql schema. The database will create relations and indexes for you, so you'll be ready to query in seconds, without writing any database code. Serverless pricing, free to get started.

## 更多

  - [awesome-graphql](https://github.com/chentsulin/awesome-graphql): 一个梦幻般的社区维护图书馆, 资源等的收藏.

          `}</Marked>

        </div>
      </div>
    </section>

  </Site>
