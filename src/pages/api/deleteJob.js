const fs = require('fs').promises;

/**
 * @method deleteJob()
 * @dexc handle delete new job
 * @param {any} req
 * @param {any} res
 * @return void
 */
const deleteJob = async (req, res) => {
    if (req.method === 'DELETE') {
        try {
            const itemIdToDelete = req.body.id;
            const existingData = JSON.parse(await fs.readFile('jobs.json', 'utf-8'));
            const itemIndexToDelete = existingData.findIndex(item => item.id === itemIdToDelete);
            if (itemIndexToDelete !== -1) {
                existingData.splice(itemIndexToDelete, 1);
                await fs.writeFile('jobs.json', JSON.stringify(existingData), 'utf-8');
                res.status(200).json({ success: true, data: existingData });
            } else {
                res.status(404).json({ error: 'Item not found' });
            }

        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: `Internal Server Error: ${error}` });
        }

      } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
};

export default deleteJob;
