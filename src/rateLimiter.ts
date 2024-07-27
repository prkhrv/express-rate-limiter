import { Request, Response, NextFunction } from 'express';

interface Options {
    windowMs: number;
    max: number;
    message?: string;
    headers?: boolean;
}

interface RateLimit {
    remaining: number;
    resetTime: Date | null;
}

interface RequestWithRateLimit extends Request {
    rateLimit?: RateLimit;
}

const rateLimiter = (options: Options) => {
    const { windowMs, max, message = 'Too many requests, please try again later.', headers = true } = options;
    const hits: { [key: string]: { count: number; resetTime: number } } = {};

    return (req: RequestWithRateLimit, res: Response, next: NextFunction) => {
        const now = Date.now();
        const resetTime = now + windowMs;
        const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';

        if (!hits[ip]) {
            hits[ip] = { count: 1, resetTime };
        } else {
            if (now > hits[ip].resetTime) {
                hits[ip] = { count: 1, resetTime };
            } else {
                hits[ip].count += 1;
            }
        }

        if (hits[ip].count > max) {
            if (headers) {
                res.setHeader('Retry-After', Math.ceil((hits[ip].resetTime - now) / 1000));
            }
            return res.status(429).send(message);
        }

        req.rateLimit = {
            remaining: max - hits[ip].count,
            resetTime: new Date(hits[ip].resetTime)
        };

        if (headers) {
            res.setHeader('X-RateLimit-Limit', max);
            res.setHeader('X-RateLimit-Remaining', req.rateLimit.remaining);
            res.setHeader('X-RateLimit-Reset', Math.ceil(hits[ip].resetTime / 1000));
        }

        next();
    };
};

export default rateLimiter;
