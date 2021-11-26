const request = require('request');

// DO NOT EDIT exported "handler" function is the entrypoint
exports.handler = async function ({ event, constants, triggers }, context, callback) {
    let baseRequest = request.defaults({
        baseUrl: `https://${constants.ManagerURL}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${constants.QTEST_TOKEN}`
        }
    });
    return baseRequest.post({
        url: '/api/v3/projects/' + constants.ProjectID + '/auto-test-logs?type=automation',
        json: true,
        body: event
    },
        function (err, response, resbody) {
            if (err) {
                console.error(err);
                Promise.reject(err);
            }
            else {
                if (response.body.type == 'AUTOMATION_TEST_LOG') {
                    //queueId = response.body.id;
                    Promise.resolve('Results queued successfully.');
                    console.info('[INFO]: Results queued successfully for id: ' + resbody.id);
                }
                else {
                    console.error('[ERROR]: ' + JSON.stringify(resbody));
                    Promise.reject('[ERROR]: Unable to upload test results.  See logs for details.');
                }
            }
        });
}