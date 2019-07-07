import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';

const port = 4000;

const users = [
    {
        name: 'Max',
        age: 29
    }, {
        name: 'Erika',
        age: 32
    }
];

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url && req.url.startsWith('/api')) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    } else {
        fs.readFile(
            path.join(__dirname, '..', 'public', 'index.html'),
            (err: NodeJS.ErrnoException | null, data: Buffer) => {
                if (err) {
                    res.end(err.message);
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            }
        )
    }
});

server.listen(port, () => console.log(`Server is running on port ${port}...`));
