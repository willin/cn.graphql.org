var React = require('react');
var Site = require('./_core/Site');
var HeaderLinks = require('./_core/HeaderLinks');
var Prism = require('./_core/Prism');
var Search = require('./_core/Search');

module.exports = ({ page, section }) =>
  <Site className="index" noSearch={true} page={page}>
    <section className="fixedSearch">
      <Search />
    </section>

    <div className="hero">
      <div className="abs">
        <header aria-hidden>
          <section>
            <HeaderLinks section={section} />
          </section>
        </header>

        <section className="intro">
          <div className="named-logo">
            <img src="/img/logo.svg" alt="GraphQL Logo" />
            <h1>GraphQL</h1>
          </div>

          <div className="marketing-col">
            <h3>描述你的数据</h3>
            <Prism language="graphql">
              {`type Project {
  name: String
  tagline: String
  contributors: [User]
}`}
            </Prism>
          </div>

          <div className="marketing-col">
            <h3>查询你所想要的</h3>
            <Prism language="graphql">
              {`{
  project(name: "GraphQL") {
    tagline
  }
}`}
            </Prism>
          </div>

          <div className="marketing-col">
            <h3>获得可预测结果</h3>
            <Prism language="json">
              {`{
  "project": {
    "tagline": "A query language for APIs"
  }
}`}
            </Prism>
          </div>
        </section>

        <div className="buttons-unit">
          <a className="button" href="/code/">
            安装
          </a>
          <a className="button" href="/learn/">
            学习
          </a>
        </div>

      </div>
    </div>

    <section className="lead">
      <h1>一种 API 查询语言</h1>
      <p>
        GraphQL 是一种为 API 接口和查询已有数据运行时环境的查询语言.
        它提供了一套完整的和易于理解的 API 接口数据描述, 给客户端权力去精准查询他们需要的数据,
        而不用再去实现其他更多的代码, 使 API 接口开发变得更简单高效, 支持强大的开发者工具.
      </p>
    </section>

    <section className="point1" id="predictable-results">
      <div className="prose">
        <h2>你所需要的,<br />就能精准得到</h2>
        {/*[Illustration: just a simple query and response?]*/}
        <p>
          发送一条 GraphQL 查询预计到你的 API 接口, 精准捕获你想要的数据, 不多也不少.
          GraphQL 查询总能返回可预测的结果.
          使用 GraphQL 的 App 因为能够不通过服务器控制他们所获取的数据, 而变得更加快速和稳定.
        </p>
      </div>
      <div className="window faux-graphiql" aria-hidden>
        <div className="query">
          <pre className="prism">
            {'{'}
            {'\n  hero {'}
            {'\n    name'}
            {'\n    height\n    mass'.split('').map((c, i) =>
              <span key={i} id={'ch' + i} className="ch">{c === '\n' ? <br/> : c}</span>)}
            <span className="cursor" />
            {'\n  }'}
            {'\n}'}
          </pre>
        </div>
        <div className="response">
          <div id="r1">
            <Prism language="json">
              {`{
  "hero": {
    "name": "Luke Skywalker"
  }
}`}
            </Prism>
          </div>
          <div id="r2">
            <Prism language="json">
              {`{
  "hero": {
    "name": "Luke Skywalker",
    "height": 1.72
  }
}`}
            </Prism>
          </div>
          <div id="r3">
            <Prism language="json">
              {`{
  "hero": {
    "name": "Luke Skywalker",
    "height": 1.72,
    "mass": 77
  }
}`}
            </Prism>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{__html: `(function(){
          var i = 0;
          var forward = true;
          setTimeout(type, 2000);
          showResponse(1);
          function type() {
            if (forward) {
              document.getElementById('ch' + i).style.display = 'inline';
              i++;
              if (i === 20) {
                forward = false;
                showResponse(3);
                setTimeout(type, 1500);
              } else if (i === 11) {
                showResponse(2);
                setTimeout(type, 1500);
              } else {
                setTimeout(type, Math.random() * 180 + 70);
              }
            } else {
              i--;
              document.getElementById('ch' + i).style.display = 'none';
              if (i === 0) {
                forward = true;
                showResponse(1);
                setTimeout(type, 2000);
              } else {
                setTimeout(type, 80);
              }
            }
          }
          function showResponse(num) {
            document.getElementById('r1').style.display = num === 1 ? 'block' : 'none';
            document.getElementById('r2').style.display = num === 2 ? 'block' : 'none';
            document.getElementById('r3').style.display = num === 3 ? 'block' : 'none';
          }
        })()`}} />
      </div>
    </section>

    <div className="grayWash">
      <section className="point2" id="single-request">
        <div className="prose">
          <h2>一条单一请求<br />获得诸多资源</h2>
          {/*Illustration: a query 2 or 3 levels deep]*/}
          <p>
            GraphQL 查询不仅访问一个资源的属性, 还可以平滑跟踪它们之间的引用.
            GrahQL API 可以在一条单一请求中获取到你的 App 所需要的所有数据, 
            而典型的 REST API 需要从多个 URL 进行加载.
            使用 GraphQL 的 App 即便在缓慢网络的手机下也依然能够很快.
          </p>
        </div>
        <div className="app-to-server" aria-hidden>
          <img src="/img/phone.svg" width="496" height="440" className="phone" />
          <div className="query">
          <Prism language="graphql">
            {`{
  hero {
    name
    friends {
      name
    }
  }
}`}
          </Prism>
          </div>
          <div className="response">
          <Prism language="json">
            {`{
  "hero": {
    "name": "Luke Skywalker",
    "friends": [
      { "name": "Obi-Wan Kenobi" },
      { "name": "R2-D2" },
      { "name": "Han Solo" },
      { "name": "Leia Organa" }
    ]
  }
}`}
          </Prism>
          </div>
          <img src="/img/server.svg" width="496" height="440" className="server" />
        </div>
      </section>
    </div>

    <section className="point3" id="type-system">
      <div className="prose">
        <h2>描述类型系统的合法性</h2>
        {/*Illustration of a type IDL following a query by line]*/}
        {/*Under: a server <-> client (Capabilities, Requirements)]?*/}
        <p>
          GraphQL API 是基于类型和字段组织的,而非终结点. 具有通过单一节点获取数据的完整能力. 
          它使用类型来确保 App 在请求时提供可用性和清晰有帮助的错误提示. App 可以使用类型来避免手写解析代码.
        </p>
      </div>
      <div className="window strong-typed-query" aria-hidden>
      <div className="query">
      <div id="query-highlight" className="highlight" />
      <Prism language="graphql">
            {`{
  hero {
    name
    friends {
      name
      homeWorld {
        name
        climate
      }
      species {
        name
        lifespan
        origin {
          name
        }
      }
    }
  }
}`}
      </Prism>
      </div>
      <div className="type-system">
      <div id="type-highlight" className="highlight" />
      <Prism language="graphql">
            {`type Query {
  hero: Character
}

type Character {
  name: String
  friends: [Character]
  homeWorld: Planet
  species: Species
}

type Planet {
  name: String
  climate: String
}

type Species {
  name: String
  lifespan: Int
  origin: Planet
}`}
      </Prism>
      </div>
      <script dangerouslySetInnerHTML={{__html: `(function(){
        var typeHighlight = document.getElementById('type-highlight');
        var queryHighlight = document.getElementById('query-highlight');
        var line = 0;
        var typeLines  = [2,6,7,6,8,13,14, 9,18,19,20,13];
        var queryLines = [2,3,4,5,6, 7, 8,10,11,12,13,14];
        highlightLine();
        function highlightLine() {
          typeHighlight.style.top = (17 * typeLines[line] - 9) + 'px';
          queryHighlight.style.top = (17 * queryLines[line] - 9) + 'px';
          line = (line + 1) % typeLines.length;
          setTimeout(highlightLine, 800 + Math.random() * 200);
        }
      })()`}} />
      </div>
    </section>

    <div className="darkWash">
    <section className="point4" id="powerful-tools">
      <div className="prose">
        <h2>使用强大的开发者工具来加快进度</h2>
        {/*Illustration of GraphiQL validation error and typeahead, animated?]*/}
        <p>
          Know exactly what data you can request from your API without
          leaving your editor, highlight potential issues before sending a
          query, and take advantage of improved code intelligence. GraphQL
          makes it easy to build powerful tools like <a href="https://github.com/graphql/graphiql" target="_blank" rel="noopener">Graph<em>i</em>QL</a> by
          leveraging your API&rsquo;s type system.</p>
      </div>
      <div className="graphiqlVid" dangerouslySetInnerHTML={{__html: `
        <video autoplay loop playsinline>
          <source src="/img/graphiql.mp4?x" type="video/mp4" />
        </video>
      `}} />
    </section>
    </div>

    <div className="grayWash">
    <section className="point5" id="without-versions">
      <div className="prose">
        <h2>无须版本<br />改进您的 API</h2>
        {/*Illustration showing more legs added to a graph? Or a type evolving over time?]*/}
        <p>
          在GraphQL API中添加新的字段和类型, 而不影响现有查询.
          老化字段可以被弃用并隐藏起来.
          通过使用单一的演进版本, GraphQL API可让应用程序持续访问新功能, 使用更清晰、更易维护的服务器代码.
        </p>
      </div>
      <div className="window type-evolution" aria-hidden>
        <div id="typeEvolveView">
          <div className="v1">
            <Prism language="graphql">
              {`type Film {
  title: String
  episode: Int
  releaseDate: String



}`}
            </Prism>
          </div>
          <div className="v2">
            <div className="add" />
            <Prism language="graphql">
              {`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String


}`}
            </Prism>
          </div>
          <div className="v3">
            <div className="add" />
            <Prism language="graphql">
              {`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String
  director: String

}`}
            </Prism>
          </div>
          <div className="v4">
            <div className="add" />
            <div className="add" />
            <div className="add" />
            <div className="add" />
            <div className="add" />
            <div className="add" />
            <div className="remove" />
            <Prism language="graphql">
              {`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String
  director: String
  directedBy: Person
}

type Person {
  name: String
  directed: [Film]
  actedIn: [Film]
}`}
            </Prism>
          </div>
          <div className="v5">
            <div className="add" />
            <Prism language="graphql">
              {`type Film {
  title: String
  episode: Int
  releaseDate: String
  openingCrawl: String
  director: String @deprecated
  directedBy: Person
}

type Person {
  name: String
  directed: [Film]
  actedIn: [Film]
}`}
            </Prism>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{__html: `(function(){
          var i = 0;
          var inView = document.getElementById('typeEvolveView');
          inView.className = 'step' + i;
          setInterval(function () {
            i = (i + 1) % 7;
            inView.className = 'step' + i;
          }, 2200);
        })()`}} />
      </div>
    </section>
    </div>

    <section className="point6" id="bring-your-own-code">
      <div className="prose">
        <h2>使用你自己的数据和代码</h2>
        {/*Illustration of each field becoming a function?]*/}
        <p>
          GraphQL在整个应用程序中创建统一的API, 而不受特定存储引擎的限制.
          可以使用多种语言来编写GraphQL API 改善现有的数据和代码.
          您可以为类型系统中的每个字段提供函数, GraphQL会以最优的并发方式调用它们.
        </p>
      </div>
      <div className="window leverage-code" aria-hidden>
        <div id="leverageCodeView">
          <Prism language="graphql">
            {`type Character {
  name: String
  homeWorld: Planet
  friends: [Character]
}`}
          </Prism>
          <Prism>
            {`// type Character {
class Character {
  // name: String
  getName() {
    return this._name
  }

  // homeWorld: Planet
  getHomeWorld() {
    return fetchHomeworld(this._homeworldID)
  }

  // friends: [Character]
  getFriends() {
    return this._friendIDs.map(fetchCharacter)
  }
}`}
          </Prism>
          <Prism language="python">
            {`# type Character {
class Character:
  # name: String
  def name(self):
    return self._name

  # homeWorld: Planet
  def homeWorld(self):
    return fetchHomeworld(self._homeworldID)

  # friends: [Character]
  def friends(self):
    return map(fetchCharacter, self._friendIDs)
`}
          </Prism>
          <Prism>
            {`// type Character {
public class Character {
  // name: String
  public String Name { get; }

  // homeWorld: Planet
  public async Task<Planet> GetHomeWorldAsync() {
    return await FetchHomeworldAsync(_HomeworldID);
  }

  // friends: [Character]
  public async IEnumerable<Task<Character>> GetFriendsAsync() {
    return _FriendIDs.Select(FetchCharacterAsync);
  }
}`}
          </Prism>
        </div>
        <script dangerouslySetInnerHTML={{__html: `(function(){
          var i = 0;
          var inView = document.getElementById('leverageCodeView');
          var delayBefore = [ 800, 1800, 1200, 3000, 3000, 3000 ];
          function step() {
            inView.className = 'step' + i;
            i = (i + 1) % 6;
            setTimeout(step, delayBefore[i]);
          }
          step();
        })()`}} />
      </div>
    </section>

    <section className="powered-by" id="whos-using">
      <div className="prose">
        <h2>谁在使用 GraphQL?</h2>
        <p>
          Facebook的移动应用程序自2012年以来一直由GraphQL提供支持.
          GraphQL规范在2015年开放采用, 现在可在许多环境中使用, 并被各种规模的团队使用.
        </p>
      </div>
      <div className="logos">
        {/* Waiting for permission from some of the below */}
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/facebook.png" title="Facebook" />
        </a>
        {/** /}
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/twitter.png" title="Twitter" className="round" />
        </a>
        {/**/}
        <a href="https://developer.github.com/v4/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/github.png" title="GitHub" className="round" />
        </a>
        <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/pinterest.png" title="Pinterest" className="round" />
        </a>
        {/** /}
        <a href="https://www.airbnb.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/airbnb.png" title="Airbnb" className="round" />
        </a>
        {/**/}
        <a href="https://www.intuit.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/intuit.png" title="Intuit" />
        </a>
        <a href="https://www.coursera.org/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/coursera.png" title="Coursera" />
        </a>
        <a href="https://www.shopify.com/" target="_blank" rel="noopener noreferrer">
          <img src="/users/logos/shopify.png" title="Shopify" className="round" />
        </a>
      </div>

      <a className="button" href="/users/">
        更多 GraphQL 用户
      </a>

    </section>

  </Site>
