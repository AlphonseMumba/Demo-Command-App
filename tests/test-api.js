const http = require('http');

// Test rapide des endpoints API
const tests = [
    { path: '/api/health', method: 'GET', description: 'Health check' },
    { path: '/api/products', method: 'GET', description: 'Get products' },
    { path: '/api/products/categories', method: 'GET', description: 'Get categories' }
];

console.log('🧪 Test des API SwiftShop\n');

function makeRequest(test, index) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: test.path,
            method: test.method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    console.log(`✅ ${test.description}: ${res.statusCode} - ${jsonData.message || 'OK'}`);
                } catch (e) {
                    console.log(`✅ ${test.description}: ${res.statusCode} - Response received`);
                }
                resolve();
            });
        });

        req.on('error', (err) => {
            console.log(`❌ ${test.description}: ${err.message}`);
            resolve();
        });

        req.end();
    });
}

async function runTests() {
    for (let i = 0; i < tests.length; i++) {
        await makeRequest(tests[i], i);
        await new Promise(resolve => setTimeout(resolve, 100)); // Petit délai
    }
    console.log('\n✨ Tests terminés!');
}

runTests();