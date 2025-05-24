export const globalError = (err, req, res, next) => {
    let code = err.statusCode || 500
    console.log(err);
    
    res.json({ message: err.message, statusCode: code })
}