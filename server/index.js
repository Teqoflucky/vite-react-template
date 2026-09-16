import { serve } from '@hono/node-server';
import { Hono } from 'hono';
var app = new Hono();
app.get('/api/profile', function (c) {
    return c.json({
        name: 'Lucky Patel',
        availability: 'probably online somewhere',
        disciplines: ['web tinkering', 'creative code', 'bug collecting'],
    });
});
app.get('/api/notes', function (c) {
    return c.json([
        { title: 'Interfaces should have secret doors', date: '08.14.25', tag: 'ESSAY' },
        { title: 'A field guide to softer systems', date: '06.02.25', tag: 'NOTES' },
        { title: 'Things I learned from a very small bug', date: '03.19.25', tag: 'PROCESS' },
    ]);
});
serve({ fetch: app.fetch, port: 8787 }, function (info) {
    console.log("Hono API listening on http://localhost:".concat(info.port));
});
