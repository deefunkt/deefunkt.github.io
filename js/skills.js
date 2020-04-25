var $skillproto = $($('.grid-item')[0]);
var $skillgrid = $('#facts .grid');

function generateSkillCards(){
    
    for (const skill of skills){
        var testcard_markup = `
            <div class="card grid-item-card container">
                <div class="row grid-card-content">
                    <div class="col-xs-4">
                        <img class="icon" src="${skill.img}" alt="">
                    </div>
                    <div class="col-xs-8">
                        <div class="row grid-item-skill">
                            <h6 class="card-title">${skill.name}</h5>
                        </div>
                    </div>
                </div>
                <div class="row grid-card-description">
                    <p>${skill.desc}</p>
                </div>
            </div>`;
        var testcard = document.createElement('div');
        for (var tag of skill.tags){
            testcard.classList.add(tag);
        }
        testcard.innerHTML = testcard_markup;
        $('.grid').append(testcard);
    }
}

function insertSkillDescription(skillcard){
    if ($(skillcard).find('.grid-card-description').text()==''){
        for (skill of skills){
            if (skill.name == skillcard.innerText){
                var desc = skill.desc;
                break;
            }
        }
        $(skillcard).find('.grid-card-description').text(desc);
    }
}

var skills = {};
skills = [
    {"name":"Python","tags":["grid-item","ent-sec","mtrx","ds-ml","osint","rev-eng","forensics","languages"],"img":"./images/icons8-python.svg",
    "desc":`My goto language`},
    {"name":"C/C++","tags":["grid-item","mtrx","rev-eng","languages"],"img":"./images/icons8-c++-48.png",
    "desc":``},
    {"name":"Volatility","tags":["grid-item","forensics"],"img":"./images/icons8-detective-64.png",
    "desc":``},
    {"name":"x86 assembly","tags":["grid-item","plat-arch","mtrx","rev-eng","languages"],"img":"./images/icons8-microchip-48.png",
    "desc":``},
    {"name":"ARM assembly","tags":["grid-item","plat-arch","mtrx","rev-eng","languages"],"img":"./images/icons8-microchip-48.png",
    "desc":``},
    {"name":"Splunk","tags":["grid-item","ent-sec","ds-ml"],"img":"./images/splunk.png",
    "desc":``},
    {"name":"Azure","tags":["grid-item","ent-sec","plat-arch","ds-ml"],"img":"./images/icons8-azure-48.png",
    "desc":``},
    {"name":"CarbonBlack","tags":["grid-item","ent-sec"],"img":"./images/carbonblack.ico",
    "desc":``},
    {"name":"ServiceNow","tags":["grid-item","ent-sec"],"img":"./images/servicenow.png",
    "desc":``},
    {"name":"Windows internals","tags":["grid-item","rev-eng","forensics"],"img":"./images/icons8-windows-10-48.png",
    "desc":``},
    {"name":"Linux internals","tags":["grid-item","mtrx","rev-eng","forensics"],"img":"./images/icons8-linux-48.png",
    "desc":``},
    {"name":"VBA","tags":["grid-item","rev-eng","languages"],"img":"./images/864px-Microsoft_Office_2013_logo.png",
    "desc":``},
    {"name":"Circuit design","tags":["grid-item","mtrx"],"img":"./images/icons8-robot-64.png",
    "desc":``},
    {"name":"Mechanical design","tags":["grid-item","mtrx"],"img":"./images/icons8-robot-64.png",
    "desc":``},
    {"name":"Control systems","tags":["grid-item","mtrx"],"img":"./images/icons8-robot-64.png",
    "desc":``},
    {"name":"Reinforcement learning","tags":["grid-item","ds-ml","mtrx"],"img":"./images/icons8-artificial-intelligence-64.png",
    "desc":``},
    {"name":"Neural networks","tags":["grid-item","ds-ml"],"img":"./images/icons8-artificial-intelligence-64.png",
    "desc":``},
    {"name":"Arduino","tags":["grid-item","plat-arch","mtrx"],"img":"./images/icons8-arduino-48.png",
    "desc":``},
    {"name":"Raspberry pi","tags":["grid-item","plat-arch","mtrx"],"img":"./images/icons8-raspberry-pi-48.png",
    "desc":``},
    {"name":"ESP 32","tags":["grid-item","plat-arch","mtrx"],"img":"./images/icons8-microchip-48.png",
    "desc":``},
    {"name":"Java","tags":["grid-item","languages"],"img":"./images/icons8-java-48.png",
    "desc":``},
    {"name":"TensorFlow","tags":["grid-item","ds-ml"],"img":"./images/tensorflow.png",
    "desc":``},
    {"name":"Pytorch","tags":["grid-item","ds-ml"],"img":"./images/pytorch.svg",
    "desc":``},
    {"name":"MATLAB","tags":["grid-item","ds-ml","languages","mtrx"],"img":"./images/icons8-matlab-64.png",
    "desc":``},
    {"name":"Solidworks","tags":["grid-item","mtrx"],"img":"./images/icons8-solidworks-48.png",
    "desc":``},
    {"name":"IDA","tags":["grid-item"],"img":"./images/Ida6-logo.png",
    "desc":``},
    {"name":"Ghidra","tags":["grid-item","rev-eng"],"img":"./images/ghidra.png",
    "desc":``},
    {"name":"Wireshark","tags":["grid-item","rev-eng","forensics"],"img":"./images/Wireshark_icon.png",
    "desc":``},
    {"name":"STM 32","tags":["grid-item","plat-arch","mtrx"],"img":"./images/icons8-microchip-48.png",
    "desc":``},
    {"name":"JavaScript","tags":["grid-item","rev-eng","languages"],"img":"./images/icons8-javascript-48.png",
    "desc":``},
    {"name":"Android","tags":["grid-item","plat-arch","mtrx"],"img":"./images/icons8-android-os-48.png",
    "desc":``},
    {"name":"French","tags":["grid-item","languages"],"img":"./images/icons8-language-48.png",
    "desc":``},
    {"name":"Japanese","tags":["grid-item","languages"],"img":"./images/icons8-language-48.png",
    "desc":``},
    {"name":"Mandarin","tags":["grid-item","languages"],"img":"./images/icons8-language-48.png",
    "desc":``},
    {"name":"Powershell","tags":["grid-item","ent-sec","rev-eng","languages"],"img":"./images/icons8-windows-10-48.png",
    "desc":``},
];