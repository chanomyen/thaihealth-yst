function calculateRisk(dustDensity, workHours, hasDisease, workLocation) {
    return 9.481 + (317.267 * dustDensity) + (0.712 * workHours) - (2.863 * hasDisease) + (1.374 * workLocation);
};

function calculateLevel(riskScore) {
    if ((riskScore >= 1) && (riskScore <= 3)) {
        return 0;
    } else if (riskScore >= (4) && (riskScore < 10)) {
        return 1;
    } else if ((riskScore >= 10) && (riskScore < 17)) {
        return 2;
    } else if ((riskScore >= 17) && (riskScore < 21)) {
        return 3;
    } else if ((riskScore >= 21) && (riskScore < 26)) {
        return 4;
    } else {
        return 4;
    }
};

const severities = ['ไม่มีนัยสำคัญ', 'ต่ำ', 'ปานกลาง', 'สูง', 'สูงมาก'];

function loadLIFF() {
    if (!window.LIFF) {
        const liffScript = document.createElement('script');
        liffScript.setAttribute('src', 'https://static.line-scdn.net/liff/edge/2.1/sdk.js');
        liffScript.setAttribute('charset', 'utf-8');
        document.body.appendChild(liffScript);
    }
}

var lineProfile
window.onload = async function () {
    console.log("On load!!!")
    loadLIFF();
    await liff.init({ liffId: "1660957751-q2MDKokx" });
    if (liff.isLoggedIn()) {
        console.log("Logged In!");
    } else {
        console.log("Not logged In!");
        liff.login();
    }
    const profile = await liff.getProfile();
    lineProfile = profile
}

function goToResultPage(level) {
    let baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    if (baseUrl.includes("github")) {
        baseUrl = `${baseUrl}/thaihealth`;
    }
    const nextPage = `${baseUrl}/result.html?level=${level}`;
    // console.log(nextPage);
    window.location.replace(nextPage);
}

async function getRiskLevel(dustDensity, workHours, hasDisease, workLocation) {
    const baseUrl = 'https://asia-southeast1-thai-health-x.cloudfunctions.net/api/silicosis/riskLevel';
    const url = new URL(baseUrl);
    url.searchParams.append('dustDensity', dustDensity);
    url.searchParams.append('workHours', workHours);
    url.searchParams.append('hasDisease', hasDisease);
    url.searchParams.append('workLocation', workLocation);
    url.searchParams.append('lineId', lineProfile.userId);
    return fetch(url, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        }
        );
}

const silicosisRiskForm = document.querySelector('form');
silicosisRiskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dustDensity = document.getElementById('dust_density').value;
    const workHours = document.getElementById('work_hours').value;
    const hasDisease = document.getElementById('has_disease').value;
    const workLocation = document.getElementById('work_location').value;

    // const riskScore = calculateRisk(dustDensity, workHours, hasDisease, workLocation);
    // const riskLevel = calculateLevel(riskScore);
    const response = await getRiskLevel(dustDensity, workHours, hasDisease, workLocation);
    goToResultPage(response.riskLevel);
});