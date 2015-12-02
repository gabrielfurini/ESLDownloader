# ESLDownloader
A downloader for "English as Second Language Podcast" written in Node.js

**Note:**
For a while, this project is using [GNU Wget](https://www.gnu.org/software/wget/) internally to download episodes.

### Usage
Install dependencies using `npm install` and just start crawler/downloader using `node app.js`. The episodes will be stored on folder `/episodes`.

For default, the script will download the first 10 episodes available. However, you can specify a range of episodes you want using `node app.js (int)from (int)until`.

For example:
`node app.js 5 25` will download from 6ᵗʰ until 25ᵗʰ episode.