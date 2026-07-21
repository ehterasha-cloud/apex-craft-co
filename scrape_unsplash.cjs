const https = require('https');

function fetchHTML(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function run() {
    const html = await fetchHTML('https://unsplash.com/s/photos/modern-house');
    const matches = html.match(/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/g);
    console.log(Array.from(new Set(matches)).slice(0, 5));
}
run();
