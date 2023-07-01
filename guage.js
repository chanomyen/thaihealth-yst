const levels = ["ไม่มีนัยสำคัญ", "ต่ำ", "ปานกลาง", "สูง!", "สูงมาก!"]
const classLabels = ["info", "success", "warning", "warning", "danger"]
const recommendations = [
    [
        "•	ติดตามเฝ้าระวังประเมินความเสี่ยงทางสุขภาพทุก ๆ 6 เดือน",
        "•	สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไป"

    ],
    [
        "•	ติดตามเฝ้าระวังประเมินความเสี่ยงทางสุขภาพทุก ๆ 3 เดือน",
        "•	สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไป"

    ],
    [
        "•	ปิดครอบแหล่งกำเนิดฝุ่น",
        "•	เปิดใช้ระบบน้ำฉีดพ่นขณะทำงาน",
        "•	ปรับลดชั่วโมงการทำงาน",
        "•	สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไป",

    ],
    [
        "•	ปิดครอบแหล่งกำเนิดฝุ่น",
        "•	เปิดใช้ระบบน้ำฉีดพ่นขณะทำงาน",
        "•	ติดตาม ตรวจวัดปริมาณความเข้มข้นฝุ่นซิลิกา",
        "•	ปรับลดชั่วโมงการทำงาน",
        "•	สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไป",
        "•	จัดสถานที่ทำงานให้ห่างจากที่พักอาศัย"
    ],
    [
        "•  ปิดครอบแหล่งกำเนิดฝุ่น",
        "•  เปิดใช้ระบบน้ำฉีดพ่นขณะทำงาน",
        "•  ติดตาม ตรวจวัดปริมาณความเข้มข้นฝุ่นซิลิกา",
        "•  ปรับลดชั่วโมงการทำงาน",
        "•  สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไป",
        "•  จัดสถานที่ทำงานให้ห่างจากที่พักอาศัย"
    ]
]

var barData = function () {
    return [
        0,
        1,
        2,
        3,
        4,
        // 5
    ];
};

var randomValue = function (data) {
    return Math.max.apply(null, data) * Math.random();
};

var data = barData();
var value = getLevel();

var config = {
    type: 'gauge',
    data: {
        //labels: ['Success', 'Warning', 'Warning', 'Error'],
        datasets: [{
            data: data,
            value: value,
            backgroundColor: ['blue', 'green', 'yellow', 'orange', 'red'],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        title: {
            display: false,
            text: ''
        },
        layout: {
            padding: {
                bottom: 30
            }
        },
        needle: {
            // Needle circle radius as the percentage of the chart area width
            radiusPercentage: 2,
            // Needle width as the percentage of the chart area width
            widthPercentage: 3.2,
            // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
            lengthPercentage: 80,
            // The color of the needle
            color: 'rgba(0, 0, 0, 1)'
        },
        valueLabel: {
            formatter: Math.round,
            display: false
        }
    }
};

const level = getLevel();

window.onload = function () {
    var ctx = document.getElementById('chart').getContext('2d');
    window.myGauge = new Chart(ctx, config);
    config.data.datasets.forEach(function (dataset) {
        dataset.data = barData();
        dataset.value = level;
    });
    document.getElementById("labelDisplay").innerHTML = `${levels[level]}`;
    document.getElementById("displayCard").classList.add(`text-bg-${classLabels[level]}`);
    const cardHead = document.getElementById("cardContentHead");
    cardHead.classList.add(`list-group-item-${classLabels[level]}`);
    if (level >= 2){
        cardHead.innerHTML = "ควรเร่งดำเนินการลดความเสี่ยง";
    } else {
        cardHead.innerHTML = "ข้อแนะนำ";
    }
    
    const contentList = document.getElementById('contentList');
    recommendations[level].forEach(element => {
        const newContent = document.createElement('li');
        newContent.textContent = element;
        newContent.classList.add('list-group-item');
        newContent.classList.add('d-flex');
        newContent.classList.add('justify-content-between');
        newContent.classList.add('align-items-start');
        contentList.appendChild(newContent);
    });
    window.myGauge.update();
};

function getLevel() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const level = urlParams.get('level');
    return level;
}

const infographicButton = document.querySelector('button');
infographicButton.addEventListener('click', async (event) => {
    let baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    if (baseUrl.includes("github")) {
        baseUrl = `${baseUrl}/thaihealth`;
    }
    const nextPage = `${baseUrl}/infographic.html`;
    console.log(nextPage);
    window.location.replace(nextPage);
});