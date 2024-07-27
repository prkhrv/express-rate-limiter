"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Create a file: tests/rateLimiter.test.ts
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const rateLimiter_1 = __importDefault(require("../src/rateLimiter"));
const app = (0, express_1.default)();
app.use((0, rateLimiter_1.default)({ windowMs: 60000, max: 10 }));
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
describe('Rate Limiter Middleware', () => {
    it('should allow up to the max number of requests', () => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < 5; i++) {
            yield (0, supertest_1.default)(app).get('/').expect(200);
        }
    }));
    it('should block requests exceeding the max number', () => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < 5; i++) {
            console.log(i);
            yield (0, supertest_1.default)(app).get('/').expect(200);
        }
        yield (0, supertest_1.default)(app).get('/').expect(429);
    }));
});
