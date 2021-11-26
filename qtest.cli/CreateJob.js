
const request = require('request');
const Debug_constants =
{
  QTEST_TOKEN: "270837e0-5857-4216-ba9e-8a5097cb3424",
  ManagerURL: "apacpso.qtestnet.com",
  ProjectID: 23464,
  ParentId: 221566,
  ParentType: "test-cycle"
}

exports.handler = function ({ event, constants, triggers }, context, callback) {

}


function CreateJobFromParent(event, constants) {
  let baseRequest = request.defaults({
    baseUrl: `https://${constants.ManagerURL}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${constants.QTEST_TOKEN}`
    }
  });

  baseRequest.get(
    {
      url: `api/v3/projects/${constants.ProjectID}/test-runs?parentId=${constants.ParentId}&parentType=${constants.ParentType}`,
      json: true
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
        Promise.reject(error);
      }

      if (response.statusCode !== 200) {
        console.log('[ERROR]: ' + body.message);
        return;
      }

      let testRuns = body.items.map(i => i.id);

      if(testRuns.length === 0){
        console.log(`[Error] No test runs found under ${constants.ParentType}: ${constants.ParentId}`);
        return;
      }
      console.log("The following test runs will be executed.");
      console.log(testRuns);
      let payload = event;
      payload.testRunIds = testRuns;

      let opts = {
        url: '/api/v3/automation/jobs/schedule/create',
        json: true,
        body: payload
      };

      baseRequest.post(opts,
        function (error, response, resbody) {
          if (error) {
            Promise.reject(error);
            console.log(error);
          }
          else {
            if (response.statusCode === 201) {
              Promise.resolve('Launch job queued successfully.');
              console.log("Triggered launch job: " + JSON.stringify(resbody));
              return response;
            }
            else {
              console.log('[ERROR]: ' + resbody.message);
            }
          }
        }
      );
    }
  );
}

let postBody = {
  "clientId": 262552,
  "name": "Post Man Trigger",
  "agentId": 4465,
  "startDate": "2021-11-09T12:28:58.033Z",
  "creator": 262552,
  "projectId": Debug_constants.ProjectID,
  "testRunIds": [
    3122944,
    3147878
  ],
  "dynamic": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  }
}
CreateJobFromParent(postBody, Debug_constants);

