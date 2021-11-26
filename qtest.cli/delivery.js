const { Constants, Triggers } = require('./pulse-sdk');

const Features = {
  getIssueLinkByFeatureName(qtestToken, scenarioProjectId, name) {
    return new ScenarioSdk.Features({ qtestToken, scenarioProjectId }).getFeatures(`"${name}"`);
  }
};

class StepLog {
  description;
  expected_result;
  actual_result;
  status;
  order = 0;
  constructor(description) {
    this.description = description;
    this.expected_result = description;
    this.actual_result = description;
    this.status = "Passed";
  }
}

class TestLog {
  name;
  automationContent;
  status;
  exe_start_date;
  exe_end_date;
  module_names = [];
  attachments = [];
  test_step_logs = [];
  constructor(name, automationContent) {
    this.name = name;
    this.automationContent = automationContent;
  }
  init(results) { }
}

class EGLTestLog extends TestLog {
  #resultsBody;
  constructor(name, automationContent) {
    super(name, automationContent);
  }

  init(results) {
    this.#resultsBody = results;
    this.setStatus();
    this.setExecutionTime();
    this.setModules();
    this.setSteps();
  }
  
  setStatus()
  {
    this.status = this.#resultsBody.status;
  }

  setExecutionTime(){
    let startDate = new Date(this.#resultsBody.start);
    this.exe_start_date = startDate.toISOString();

    let endDate = new Date(this.#resultsBody.stop);
    this.exe_end_date = endDate.toISOString();
  }

  setModules() {
    let labels = this.#resultsBody.labels;
    let parentSuite = labels.find(label => label.name === 'parentSuite');
    if (parentSuite === undefined) { return; }
    this.module_names.push(parentSuite.value);
    let suite = labels.find(label => label.name === 'suite');
    if (suite === undefined) { return; }
    this.module_names.push(suite.value);
    let subSuite = labels.find(label => label.name === 'subSuite');
    if (subSuite === undefined) { return; }
    this.module_names.push(subSuite.value);
  }

  setSteps(){
    
  }
}

class AutoLog {
  test_cycle;
  test_logs = [];
  constructor(testCycle) {
    this.test_cycle = testCycle;
  }
  addTestLog(testLog) {
    this.test_logs.push(testLog);
  }
}

class EGLParser {
  constructor(resultsRoot) {
    this.resultsRoot = resultsRoot;
  }

  async parse() {
    let autoLog = new AutoLog(Constants.ParentId);
    try {
      const { readdir } = require('fs/promises');
      const path = require('path');
      let allFiles = await readdir(this.resultsRoot);
      for (let file of allFiles.filter(this.isResultFile).map(i => path.join(this.resultsRoot, i))) {
        console.info(`Parsing result file: [${file}].`);
        autoLog.addTestLog(this.buildTricentisTestLog(file));
      }
    } catch (error) {
      console.error(error);
    }
    return autoLog;
  }

  buildTricentisTestLog(file) {
    let result = require(file);
    let testLog = new EGLTestLog(result.name, result.uuid);
    testLog.init(result);
    return testLog;
  }

  isResultFile(file) {
    return file.endsWith("result.json");
  }
}

function sendToTricentis(testResults) {
  const axios = require('axios');
  axios.post('https://pulse-us-east-1.qtestnet.com/webhook/f0dc6aa7-0992-480c-a4fa-535c9057774a', testResults);
}

(async () => {
  let parser = new EGLParser("C:\\temp\\Edg.Eden");
  let autoLog = await parser.parse();

  console.info(`Total test cases count: ${autoLog.test_logs.length}`);
  sendToTricentis(autoLog);
})();