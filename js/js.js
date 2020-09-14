import { CountUp } from '.././js/countUp.min.js';
let selectBox=document.getElementById("selectBox");
let data,total;

fetch("https://api.covid19api.com/summary")
.then((res)=>{
    return res.json()
})
.then((Data=>{
    total=Data;
    data=Data.Countries;
    console.log(total);
    data.forEach(element => {
        let str=document.createElement("option");
        str.textContent=element.Country;
        str.value=element.Country;
        selectBox.appendChild(str);
    });
})).then(()=>main())
function main()
{
    var labels = [
        "Infected",
        "Recovered",
        "Deaths"
    ];

    var clients = [
        total.Global.TotalConfirmed,
        total.Global.TotalRecovered,
        total.Global.TotalDeaths
    ];
    document.getElementById("i").textContent=clients[0];
    document.getElementById("r").textContent=clients[1];
    document.getElementById("d").textContent=clients[2];
    var numI=parseInt(document.getElementById("i").innerHTML);
    var numE=parseInt(document.getElementById("r").innerHTML);
    var numD=parseInt(document.getElementById("d").innerHTML);

    var countUp1 = new CountUp('i', numI);
    var countUp2 = new CountUp('r', numE);
    var countUp3 = new CountUp('d', numD);
    countUp1.start();
    countUp2.start();
    countUp3.start();

    selectBox.onchange=function()
    {
        var strUser = selectBox.options[selectBox.selectedIndex].value;
    
        if(strUser=="Global")
        {
            //console.log("gase");
            clients[0]=total.Global.TotalConfirmed;
            clients[1]=total.Global.TotalRecovered;
            clients[2]=total.Global.TotalDeaths;
            document.getElementById("i").textContent=clients[0];
            document.getElementById("r").textContent=clients[1];
            document.getElementById("d").textContent=clients[2];
        }
        else
        {
            data.forEach(element => {
                if(element.Country==strUser)
                {
                    clients[0]=element.TotalConfirmed;
                    clients[1]=element.TotalRecovered;
                    clients[2]=element.TotalDeaths;
                    document.getElementById("i").textContent=clients[0];
                    document.getElementById("r").textContent=clients[1];
                    document.getElementById("d").textContent=clients[2];
                }
            })
        }
        mixChart.update();
        var numI=parseInt(document.getElementById("i").innerHTML);
        var numE=parseInt(document.getElementById("r").innerHTML);
        var numD=parseInt(document.getElementById("d").innerHTML);

        countUp1.update(numI);
        countUp2.update(numE);
        countUp3.update(numD);
    }
    var mix = document.getElementById("myChart").getContext('2d');

        var mixChart = new Chart(mix, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Clients",
                        data: clients,
                        borderColor: 'rgba(0, 0, 0, 0)',
                        backgroundColor: [
                            "rgb(0,0,255,.5)","rgb(0,255,0,.5)","rgb(255,0,0,.5)"
                        ],
                        yAxisID: 'clients',
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [

                        {
                            id: "clients",
                            position: 'left',
                            ticks: {
                                beginAtZero: true,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Clients'
                            }
                        },
                    ]
                },
            }
        });
    
        mixChart.update();
}