#Start Something

[![Waffle.io - Columns and their card count](https://badge.waffle.io/awaywego/awaywego.svg?columns=all)](https://waffle.io/awaywego/awaywego)
![Travis CI](https://travis-ci.org/awaywego/awaywego.svg?branch=master)

## App Vision

A social app which helps take the pressure out of hanging out and planning activities with your friends. You can collaborate on ideas, discuss availability, and ultimately schedule an event. StartSomething is particularly useful for groups that schedule recurring events and like to switch things up each time.

### Contributors
Dominic Ma
Jared Meek
Jonathan Lewis
Kent Shephard

### Table of Contents
- [Quick Start](#quick-start)
- [The Basics](#the-basics)
- [API Reference](https://github.com/awaywego/awaywego/wiki/API)
- [Database Schema](https://github.com/awaywego/awaywego/wiki/Database-Schema)

### Requirements
- Node package manager
- Node v6+
- MongoDB
- see package.json for dependencies
- Bing image search API key
- [Google Cloud API Application](https://console.cloud.google.com/home/dashboard)
  - [People API](https://console.cloud.google.com/apis/library/people.googleapis.com/?q=people)

### Credentials
Credentials are stored in keys.config.js in the following format:
```javascript
module.exports = {
  IMAGE_API_KEY: 'xxxxxxxxxx',
  GOOGLE_CLIENT_ID: 'xxxxxxx',
  GOOGLE_CLIENT_SECRET: 'xxxxxxxxx'
};
```

### Quick Start

`npm install`
`npm run pack`
`npm start`

### Contributing

Want to contribute? Great!

See CONTRIBUTING.md for contribution guidelines.




### License
MIT License

Copyright (C) 2017 Start Something project authors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
