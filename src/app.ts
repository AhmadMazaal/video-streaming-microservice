import express, { Application, Request, Response } from 'express';
import fs from 'fs';

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

const PORT = process.env.PORT;

const app: Application = express();

app.get('/', (_req: Request, res: Response) => res.send('Hello World!'));

app.get("/video", (_req: Request, res: Response) => {
    const videoPath = `${__dirname}/../videos/sample-video.mp4`;

    fs.stat(videoPath, (err, stats) => {
        if (err) {
            console.error("error: ", err);
            return res.status(404).send("<h1>File not found</h1>");
        }

        res.writeHead(
            200,
            {
                "Content-Length": stats.size,
                "Content-Type": "video/mp4",
            }
        );
        fs.createReadStream(videoPath).pipe(res);
    });
});

app.listen(
    PORT,
    () => {
        return console.log(`Listening at http://localhost:${PORT}`);
    }
);
