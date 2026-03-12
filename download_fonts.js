const fs = require('fs');
const https = require('https');

const cssPath = 'fonts/inter.css';
let css = fs.readFileSync(cssPath, 'utf8');

// The regex might need to catch different url formats
const urlRegex = /url\((https:\/\/[^)]+)\)/g;
let match;
const urls = [];

while ((match = urlRegex.exec(css)) !== null) {
    urls.push(match[1]);
}

if (urls.length === 0) {
    console.log('No URLs found in CSS');
} else {
    let pending = urls.length;
    urls.forEach((url, i) => {
        const filename = `inter-${i}.woff2`;
        https.get(url, (res) => {
            const file = fs.createWriteStream(`fonts/${filename}`);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename}`);
                pending--;
                if (pending === 0) {
                    fs.writeFileSync(cssPath, css);
                    console.log('CSS updated successfully.');
                }
            });
        });
        css = css.replace(url, `'${filename}'`);
    });
}
