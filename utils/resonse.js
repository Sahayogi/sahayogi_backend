module.exports = function sendResponse(data) {
    return {
        status: "success",
        statusCode: 200,
        data: data
    };
}