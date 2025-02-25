document.addEventListener("DOMContentLoaded", function() {
    async function fetchDashboardData() {
        try {
            let response = await fetch("logs/logs.json"); // Fetch logs from the repository
            let data = await response.json();
            
            document.getElementById("historical-status").innerText = data.historical_status;
            document.getElementById("live-status").innerText = data.live_status;
            
            let logsContainer = document.getElementById("logs");
            logsContainer.innerHTML = "";
            data.logs.slice(-20).forEach(log => { // Show last 20 logs
                let logEntry = document.createElement("p");
                logEntry.textContent = log;
                logsContainer.appendChild(logEntry);
            });
        } catch (error) {
            console.error("Error fetching logs: ", error);
            document.getElementById("logs").innerText = "Error fetching logs...";
        }
    }

    setInterval(fetchDashboardData, 5000); // Auto-refresh every 5 seconds
    fetchDashboardData();
});
