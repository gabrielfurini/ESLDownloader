# ESLDownloader
A downloader for "English as Second Language Podcast" written in Node.js

### Installation
Install dependencies using `npm install`.

**Note:**
For now, this project is using [GNU Wget](https://www.gnu.org/software/wget/) internally to download episodes.
Linux distros has this package installed by default. If you are using MACOSX or Windows, don't forget to install. This [wiki](http://wget.addictivecode.org/FrequentlyAskedQuestions?action=show&redirect=Faq#download) can be helpful.

### Usage

`node app.js` command will download the last 10 episodes available by default. 
However, you can specify a range of episodes you want typing `node app.js (int)from (int)until`.

For example:
`node app.js 5 25` will download from 6ᵗʰ until 25ᵗʰ episode.
