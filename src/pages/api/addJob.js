/**
 * @method addJob()
 * @dexc handle add new job
 * @param {any} req
 * @param {any} res
 * @return void
 */
const addJob = (req, res) => {
    if (req.method === 'POST') {
        try {
            const newData = req.body;
            const storedData = require('../../../jobs.json');
            const updatedData = [...storedData, newData];
            require('fs').writeFileSync('jobs.json', JSON.stringify(updatedData));
            res.status(200).json({ success: true, data: updatedData });
            
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};

export default addJob;
