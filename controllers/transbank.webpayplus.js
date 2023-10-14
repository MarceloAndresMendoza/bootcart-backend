import pkg from 'transbank-sdk';
const { WebpayPlus } = pkg;


export const webpayTransactionFlow = async ( req, res ) => {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;
    if ( !buyOrder || !sessionId || !amount || !returnUrl ) {
        res.status(400).json({ 
            message: 'Missing parameters',
            buyOrder: buyOrder,
            sessionId: sessionId,
            amount: amount,
            returnUrl: returnUrl });
        return
    }
    try {
        const createResponse = await ( new WebpayPlus.Transaction()).create(
            buyOrder,
            sessionId,
            amount,
            returnUrl
            )
            const { token, url } = createResponse;
        res.status(200).json({ token: token, url: url });
    } catch (error) {
        res.status(500).json({ message: 'Couldnt communicate with the payment server', error: error });
    }
}