const bot = require('./SubmitDefect');

const { Constants, Triggers } = require('./pulse-sdk');

const azureBug =
{
    "subscriptionId": "132d5d47-841d-4fac-97b9-ceeb2894f9d5",
    "notificationId": 1,
    "id": "088cd701-5ee2-4a47-8cf9-94277e4bc1f2",
    "eventType": "workitem.created",
    "publisherId": "tfs",
    "message": {
      "text": "Bug #1 (First Bug not cool) created by Chengwei Li\r\n(https://dev.azure.com/tricentis-au/web/wi.aspx?pcguid=e41c3077-faca-4336-848e-e55425c9b248&id=1)",
      "html": "<a href=\"https://dev.azure.com/tricentis-au/web/wi.aspx?pcguid=e41c3077-faca-4336-848e-e55425c9b248&amp;id=1\">Bug #1</a> (First Bug not cool) created by Chengwei Li",
      "markdown": "[Bug #1](https://dev.azure.com/tricentis-au/web/wi.aspx?pcguid=e41c3077-faca-4336-848e-e55425c9b248&id=1) (First Bug not cool) created by Chengwei Li"
    },
    "detailedMessage": {
      "text": "Bug #1 (First Bug not cool) created by Chengwei Li\r\n(https://dev.azure.com/tricentis-au/web/wi.aspx?pcguid=e41c3077-faca-4336-848e-e55425c9b248&id=1)\r\n\r\n- Area: qTest_Integration\r\n- Iteration: qTest_Integration\r\n- State: New\r\n- Severity: 3 - Medium\r\n",
      "html": "<a href=\"https://dev.azure.com/tricentis-au/web/wi.aspx?pcguid=e41c3077-faca-4336-848e-e55425c9b248&amp;id=1\">Bug #1</a> (First Bug not cool) created by Chengwei Li<ul>\r\n<li>Area: qTest_Integration</li>\r\n<li>Iteration: qTest_Integration</li>\r\n<li>State: New</li>\r\n<li>Severity: 3 - Medium</li></ul>",
      "markdown": "[Bug #1](https://dev.azure.com/tricentis-au/web/wi.aspx?pcguid=e41c3077-faca-4336-848e-e55425c9b248&id=1) (First Bug not cool) created by Chengwei Li\r\n\r\n* Area: qTest_Integration\r\n* Iteration: qTest_Integration\r\n* State: New\r\n* Severity: 3 - Medium\r\n"
    },
    "resource": {
      "id": 1,
      "rev": 1,
      "fields": {
        "System.AreaPath": "qTest_Integration",
        "System.TeamProject": "qTest_Integration",
        "System.IterationPath": "qTest_Integration",
        "System.WorkItemType": "Bug",
        "System.State": "New",
        "System.Reason": "New defect reported",
        "System.CreatedDate": "2021-11-23T02:50:25.323Z",
        "System.CreatedBy": "Chengwei Li <c.li@tricentis.com>",
        "System.ChangedDate": "2021-11-23T02:50:25.323Z",
        "System.ChangedBy": "Chengwei Li <c.li@tricentis.com>",
        "System.CommentCount": 0,
        "System.Title": "First Bug not cool",
        "Microsoft.VSTS.Common.StateChangeDate": "2021-11-23T02:50:25.323Z",
        "Microsoft.VSTS.Common.Priority": 2,
        "Microsoft.VSTS.Common.Severity": "3 - Medium",
        "Microsoft.VSTS.Common.ValueArea": "Business",
        "Microsoft.VSTS.TCM.ReproSteps": "<div>User login </div><div><br> </div>"
      },
      "_links": {
        "self": {
          "href": "https://dev.azure.com/tricentis-au/9c33309b-56d1-45f1-b33f-bbdd1113e62b/_apis/wit/workItems/1"
        },
        "workItemUpdates": {
          "href": "https://dev.azure.com/tricentis-au/9c33309b-56d1-45f1-b33f-bbdd1113e62b/_apis/wit/workItems/1/updates"
        },
        "workItemRevisions": {
          "href": "https://dev.azure.com/tricentis-au/9c33309b-56d1-45f1-b33f-bbdd1113e62b/_apis/wit/workItems/1/revisions"
        },
        "workItemComments": {
          "href": "https://dev.azure.com/tricentis-au/9c33309b-56d1-45f1-b33f-bbdd1113e62b/_apis/wit/workItems/1/comments"
        },
        "html": {
          "href": "https://dev.azure.com/tricentis-au/9c33309b-56d1-45f1-b33f-bbdd1113e62b/_workitems/edit/1"
        },
        "workItemType": {
          "href": "https://dev.azure.com/tricentis-au/9c33309b-56d1-45f1-b33f-bbdd1113e62b/_apis/wit/workItemTypes/Bug"
        },
        "fields": {
          "href": "https://dev.azure.com/tricentis-au/9c33309b-56d1-45f1-b33f-bbdd1113e62b/_apis/wit/fields"
        }
      },
      "url": "https://dev.azure.com/tricentis-au/9c33309b-56d1-45f1-b33f-bbdd1113e62b/_apis/wit/workItems/1"
    },
    "resourceVersion": "1.0",
    "resourceContainers": {
      "collection": {
        "id": "e41c3077-faca-4336-848e-e55425c9b248",
        "baseUrl": "https://dev.azure.com/tricentis-au/"
      },
      "account": {
        "id": "564a03d9-60f8-467a-8b81-89f56059c65f",
        "baseUrl": "https://dev.azure.com/tricentis-au/"
      },
      "project": {
        "id": "9c33309b-56d1-45f1-b33f-bbdd1113e62b",
        "baseUrl": "https://dev.azure.com/tricentis-au/"
      }
    },
    "createdDate": "2021-11-23T02:50:32.355664Z"
  }

bot.handler(
    {
        constants: Constants,
        event: azureBug,
        triggers: Triggers
    });

// bot.handler(
//     {
//         constants: Constants,
//         event: { text: `hello from Main debug JS at ${new Date()}` },
//         triggers: Triggers
//     });