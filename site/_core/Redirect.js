/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

export default ({ to }) =>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="refresh" content={'1;url=' + to} />
      <script dangerouslySetInnerHTML={{__html: `
        window.location.href = "${to}"
      `}} />
      <title>GraphQL 页面跳转</title>
    </head>
    <body>
      如果您没有自动跳转到页面, <a href={to}>请点击这里</a>.
    </body>
  </html>
