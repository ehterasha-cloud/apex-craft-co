const https = require('https');

function searchImages(query) {
    return new Promise((resolve, reject) => {
        const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const urls = json.results.map(r => r.urls.raw.split('?')[0]);
                    resolve({ query, urls });
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    const queries = [
        "modern luxury house exterior beverly hills",
        "brutalist architecture concrete house",
        "historic classical mansion stone brick",
        "luxury modern house ocean view malibu",
        "timber wood cabin architecture luxury forest"
    ];
    for (const q of queries) {
        try {
            const res = await searchImages(q);
            console.log("Query:", res.query);
            console.log(res.urls[0] || "No results");
            console.log("---");
        } catch (e) {
            console.error(e);
        }
    }
}
main();
