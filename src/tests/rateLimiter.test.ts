// Create a file: tests/rateLimiter.test.ts
import express from 'express';
import request from 'supertest';
import rateLimiter from '../rateLimiter';

const app = express();
app.use(rateLimiter({ windowMs: 60000, max: 10 }));

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
            console.log(i);
            await request(app).get('/').expect(200);
        }
        await request(app).get('/').expect(429);
    });
});
