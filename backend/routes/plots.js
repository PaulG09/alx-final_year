const express = require("express");
const { spawn } = require("child_process");

const router = express.Router();

// Helper function to handle the Python process
function runPythonScript(scriptName, endpoint, res) {
  const pythonProcess = spawn("python3", [scriptName, endpoint]);

  let result = "";
  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    } else {
      res.status(500).send({ error: `Failed to generate ${endpoint} plot.` });
    }
  });
}

// General route for generating different plots based on the `plotType` parameter
router.get("/plots/:plotType", (req, res) => {
  const plotType = req.params.plotType.toLowerCase();

  // Validate if the plotType is one of the allowed types
  const validPlotTypes = [
    "disease-trend",
    "disease-comparison",
    "disease-distribution",
    "disease-heatmap",
    "disease-prediction",
  ];

  if (validPlotTypes.includes(plotType)) {
    runPythonScript("main.py", plotType, res);
  } else {
    res.status(400).send({
      error:
        "Invalid plot type. Valid options are: disease-trend, disease-comparison, disease-distribution, disease-heatmap.",
    });
  }
});

module.exports = router;
