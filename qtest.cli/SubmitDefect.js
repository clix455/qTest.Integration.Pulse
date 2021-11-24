
const request = require('request');


exports.handler = function ({ event, constants, triggers }, context, callback) {
  let body = event;

  let baseRequest = request.defaults({
    baseUrl: `https://${constants.ManagerURL}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${constants.QTEST_TOKEN}`
    }
  });
  let bugId = body.resource.id;

  const azureBugFields = body.resource.fields;
  let defectProperties = [];
  defectProperties.push({
    field_id: 11865034,
    field_name: "Summary",
    field_value: azureBugFields['System.Title']
  });
  defectProperties.push({
    field_id: 11865018,
    field_name: "Description",
    field_value: azureBugFields['Microsoft.VSTS.TCM.ReproSteps']
  });
  defectProperties.push({
    field_id: 11868879,
    field_name: "Azure ID",
    field_value: bugId
  });

  let payload = {
    properties: defectProperties
  }

  baseRequest.post(
    {
      //api/v3/projects/{{projectId}}/defects
      url: `api/v3/projects/${constants.ProjectID}/defects`,
      json: true,
      body: payload
    },
    function (error, response, resbody) {
      if (error) {
        Promise.reject(error);
        console.log(error);
      }
      else {
        if (response.statusCode === 201) {
          Promise.resolve('Defects created for the corresponding azure bug successfully.');
          console.log("Created defect for azure bug : " + bugId);
          return response;
        }
        else {
          console.log('[ERROR]: ' + resbody.message);
        }
      }
    }
  );
}
