import { Hono } from 'hono';

type AssetFetcher = { fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> };
type Bindings = { ASSETS: AssetFetcher };
const app = new Hono<{ Bindings: Bindings }>();

app.get('/api/profile', (c) => c.json({ name: 'Lucky Patel', availability: 'probably online somewhere', disciplines: ['web tinkering', 'creative code', 'bug collecting'] }));
app.get('/api/notes', (c) => c.json([
  { title: 'Interfaces should have secret doors', date: '08.14.25', tag: 'ESSAY' },
  { title: 'A field guide to softer systems', date: '06.02.25', tag: 'NOTES' },
  { title: 'Things I learned from a very small bug', date: '03.19.25', tag: 'PROCESS' },
]));

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;


