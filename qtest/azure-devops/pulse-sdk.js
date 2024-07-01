const Constants = require(`${process.env.APPDATA}\\TRICENTIS\\qTest\\pulse-constants-Azure DevOps.json`)

class Trigger{
    constructor(name){
        this.name = name;
    }
}

const triggers = [
    new Trigger('CreateDefectInAzureDevops'),
    new Trigger('AzureDevopsWorkItemForDefectUpdated'),
    new Trigger('AzureDevopsWorkItemForRequirementCreatedUpdatedDeleted')
];


class Webhooks {
    constructor() { }
    invoke(trigger, body) {
        const bot = require('./CreateDefectInAzureDevops');
        bot.handler(
            {
                constants: Constants,
                event: body,
                triggers: triggers
            });
    }
}

module.exports = {
    Webhooks: Webhooks,
    Constants: Constants,
    Triggers: triggers
};