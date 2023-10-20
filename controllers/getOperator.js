//for retriving operators which is hardcoded here


const {operatorData} = require('../data/operator')

exports.getOperators = async (req, res) => {
    try {
       
        const operators = operatorData;
   
        return res.status(200).json(operators);
    } catch (error) {
       
        return res.status(500).json({ error: 'Internal server error' });
    }
};
