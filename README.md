# Rate Limiter Middleware for Express 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A robust and flexible rate limiter middleware for Express applications written in TypeScript. Control the rate of requests to your API endpoints with ease! ✨

## Features 🌟

- ⏱ Configurable time windows and request limits
- 📊 Rate limiting by IP address
- 🛡 Customizable response messages
- 📋 Optional response headers for rate limit status
- 🔒 Lightweight and easy to integrate

## Installation 📦

Install via npm:

```bash
npm i @prkhrv/express-rate-limiter
```

Or via Yarn:

```bash
yarn add @prkhrv/express-rate-limiter
```

## Usage 🛠

### Basic Usage

```javascript
const express = require('express');
const rateLimiter = require('your-package-name');

const app = express();
app.use(rateLimiter({ windowMs: 60000, max: 100 }));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### Options

- `windowMs` (number): Time window in milliseconds for which requests are checked.
- `max` (number): Maximum number of requests allowed in the time window.
- `message` (string): Custom message to send when rate limit is exceeded (default: 'Too many requests, please try again later.').
- `headers` (boolean): Whether to include rate limit headers in the response (default: true).

### Example with Custom Options

```javascript
const express = require('express');
const rateLimiter = require('your-package-name');

const app = express();
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'You have exceeded the 100 requests in 15 minutes limit!', 
    headers: true
}));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## Testing 🧪

To run tests, use the following command:

```bash
npm test
```

Ensure you have all development dependencies installed:

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

### Example Test

```typescript
import express from 'express';
import request from 'supertest';
import rateLimiter from '../src/rateLimiter';

const app = express();
app.use(rateLimiter({ windowMs: 60000, max: 5 }));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

describe('Rate Limiter Middleware', () => {
    it('should allow up to the max number of requests', async () => {
        for (let i = 0; i < 5; i++) {
            await request(app).get('/').expect(200);
        }
    });

    it('should block requests exceeding the max number', async () => {
        for (let i = 0; i < 5; i++) {
            await request(app).get('/').expect(200);
        }
        await request(app).get('/').expect(429);
    });
});
```

## Contributing 🤝

Contributions are welcome! Please open an issue or submit a pull request for any bugs, improvements, or new features.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
