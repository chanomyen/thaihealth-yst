//// Declarations states

// Variables
const severityObject = {
    levels: ["ไม่มีนัยสำคัญ", "ต่ำ", "ปานกลาง", "สูง!", "สูงมาก!"],
    colors: ['#0d6efd', '#198754', '#ffc107', '#fd7e14', '#dc3545']
}

const chartTitle = {
    severityPortion: "จำนวน"
}

// Functions
const getStatisticsData = async () => {
    const baseUrl = 'https://asia-southeast1-thai-health-x.cloudfunctions.net/api/silicosis/statistics';
    // const baseUrl = 'http://localhost:5001/thai-health-x/asia-southeast1/api/silicosis/statistics';
    return await fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            return data;
        });
}

// Chart initial
const chartInitial = async () => {
    // data setup
    const severityPortionChart = document.getElementById('severityPortionChart');
    const genderChart = document.getElementById('genderChart');
    const ageChart = document.getElementById('ageChart');
    const workTypeChart = document.getElementById('workTypeChart');

    // fetch data from server
    let statisticsData = {};
    await getStatisticsData()
        .then(data => {
            statisticsData = data.statisticsData;
        });

    const genderData = {
        labels: statisticsData.genderData.labels,
        datasets: [{
            label: "จำนวน",
            data: statisticsData.genderData.data,
            backgroundColor: severityObject.colors,
            hoverOffset: 4
        }]
    };
    const ageData = {
        labels: statisticsData.ageData.labels,
        datasets: [{
            label: "จำนวน",
            data: statisticsData.ageData.data,
            backgroundColor: severityObject.colors,
            hoverOffset: 4
        }]
    };
    const workTypeData = {
        labels: statisticsData.workTypeData.labels,
        datasets: [{
            label: "จำนวน",
            data: statisticsData.workTypeData.data,
            backgroundColor: severityObject.colors,
            hoverOffset: 4
        }]
    };
    const severityPortionData = {
        labels: statisticsData.severityPortionData.labels,
        datasets: [{
            label: chartTitle.severityPortion,
            data: statisticsData.severityPortionData.data,
            backgroundColor: severityObject.colors,
            hoverOffset: 4
        }]
    };

    // render data to the html elements
    new Chart(genderChart, {
        type: 'pie',
        data: genderData
    });

    new Chart(ageChart, {
        type: 'pie',
        data: ageData
    });

    new Chart(workTypeChart, {
        type: 'pie',
        data: workTypeData
    });

    new Chart(severityPortionChart, {
        type: 'pie',
        data: severityPortionData
    });
}

//// Executions state
window.onload = async () => {
    // access to the html elements
    chartInitial()

}
