const contractInterface = require('../db/interfaces/contractInterface');
const loanInterface = require('../db/interfaces/loanInterface');
/**
 * @description - this method will post a contract
 * @route - POST /api/contract
 * @param {*} req - body will include the user id of the lender Id + receiver id + loan Id + amount + installments
 * @param {*} res - Response for the api call
 * @returns 
 */
 const handlePOSTCreateContract = async ( req,res,next )=>{
    try {
        const contractQueryResult = await contractInterface.createContract({
            loanId: req.body.loanId,
            lenderId: req.body.lenderId,
            receiverId: req.body.receiverId,
            amount: req.body.amount,
            installments: req.body.installments
        });

        if( contractQueryResult.status == 'OK' ){
            return res.status(200).send( {
                status: 'OK',
                data: contractQueryResult.data,
                message: contractQueryResult.message
            } );
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description - this method will end the contract
 * @route -PUT /api/contract
 * @param {*} req - body will include the user id of the request issuer + contract id
 * @param {*} res - Response for the api call
 * @returns 
 */
const handlePUTEndContract = async ( req,res,next )=>{
    try {
        const contractQueryResult = await contractInterface.endContract({
            contractId: req.body.contractId,
            issuerId: req.body.issuerId
        });

        if( contractQueryResult.status == 'OK' ){
            return res.status(200).send( {
                status: 'OK',
                data: contractQueryResult.data,
                message: contractQueryResult.message
            } );
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description - this method will end the contract
 * @route -PUT /api/contract/:contractId
 * @param {*} req - body will include the user id of the request issuer + contract id
 * @param {*} res - Response for the api call
 * @returns 
 */
const handlePUTAcceptContract = async ( req,res,next )=>{
    try {
        let contractQueryResult = await contractInterface.acceptContract({
            contractId: req.params.contractId,
            issuerId: req.body.issuerId
        });

        if( contractQueryResult.status == 'OK' ){

            const loanQueryResult = await loanInterface.acceptContractOffer( {
                loanId: contractQueryResult.data.loanId,
                contractId: req.params.contractId,
                issuerId: req.body.issuerId
            });

            if( loanQueryResult.status == 'OK' ){
                return res.status(200).send( {
                    status: 'OK',
                    data: contractQueryResult.data,
                    message: contractQueryResult.message
                } );
            }
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}
/**
 * @description - this method will end the contract
 * @route -PUT /api/contract/:contractId
 * @param {*} req - body will include the user id of the request issuer + contract id
 * @param {*} res - Response for the api call
 * @returns 
 */
const handleDELETEDenyContract = async ( req,res,next )=>{
    try {
        let contractQueryResult = await contractInterface.denyContract({
            contractId: req.params.contractId,
            issuerId: req.body.issuerId
        });

        if( contractQueryResult.status == 'OK' ){

            const loanQueryResult = await loanInterface.denyContractOffer( {
                loanId: contractQueryResult.data.loanId,
                contractId: req.params.contractId,
                issuerId: req.body.issuerId
            });

            if( loanQueryResult.status == 'OK' ){
                return res.status(200).send( {
                    status: 'OK',
                    data: contractQueryResult.data,
                    message: contractQueryResult.message
                } );
            }
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}

module.exports = {
    handlePUTEndContract,
    handlePOSTCreateContract,
    handlePUTAcceptContract,
    handleDELETEDenyContract
}
