const bot = require('./CreateDefectInAzureDevops');

const { Constants, Triggers } = require('./pulse-sdk');

const payload =
{
  "event_timestamp": 1719289526221,
  "event_type": "defect_submitted",
  "defect": {
    "id": 1191208,
    "project_id": 42841
  }
}

bot.handler(
    {
        constants: Constants,
        event: payload,
        triggers: Triggers
    });

