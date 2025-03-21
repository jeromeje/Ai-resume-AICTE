const { PythonShell } = require("python-shell");

function rankResumes(applications) {
    return applications.map(app => ({
        name: app.resume.split("/").pop(),
        score: Math.random() * 100
    })).sort((a, b) => b.score - a.score);
}

module.exports = rankResumes;
