export const checkLoginToken = async (req, res) => {
        console.log('Authorized')
        res.status(200).json({message:'token accepted'});
}