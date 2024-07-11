const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const dataPath = './data/output_json_chunks';

app.use(express.json());

const isJsonFile = (filePath) => {
    return path.extname(filePath).toLowerCase() === '.json';
};

app.get('/api/search', (req, res) => {
    const { address } = req.query;
    const transactions = [];

    fs.readdirSync(dataPath).forEach(file => {
        const filePath = path.join(dataPath, file);

        if (isJsonFile(filePath)) {
            const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            fileContent.forEach(transaction => {
                if (transaction.from === address || transaction.to === address) {
                    transactions.push(transaction);
                }
            });
        }
    });

    res.json(transactions);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
