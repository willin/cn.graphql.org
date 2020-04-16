/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

const links = [
<<<<<<< HEAD
  { section: 'learn', text: '学习', href: '/learn/' },
  { section: 'code', text: '代码', href: '/code/' },
  { section: 'community', text: '社区', href: '/community/' },
  { section: 'blog', text: '博客', href: '/blog/' },
  { section: 'spec', text: '定义', href: 'http://facebook.github.io/graphql/' },
  { section: 'bug', text: '翻译纠错', href: 'https://github.com/willin/graphql.js.cool/issues/1' },
=======
  { section: 'learn', text: 'Learn', href: '/learn/' },
  { section: 'code', text: 'Code', href: '/code/' },
  { section: 'community', text: 'Community', href: '/community/' },
  { section: 'spec', text: 'Spec', href: 'https://graphql.github.io/graphql-spec/' },
  { section: 'codeofconduct', text: 'Code of Conduct', href: '/codeofconduct/' },
  { section: 'foundation', text: 'Foundation', href: 'https://foundation.graphql.org/' },
  { section: 'landscape', text: 'Landscape', href: 'https://l.graphql.org/' },
>>>>>>> source
];

export default ({ section }) =>
  <nav>
    {links.map(link =>
      <a
        key={link.section}
        href={link.href}
        target={link.href.slice(0, 4) === 'http' ? '_blank' : null}
        rel={link.href.slice(0, 4) === 'http' ? 'noopener noreferrer' : null}
        className={link.section === section ? 'active' : null}>
        {link.text}
      </a>
    )}
  </nav>
