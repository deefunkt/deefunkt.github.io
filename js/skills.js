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
    {"name":"Python","tags":["grid-item","vr","mtrx","ds-ml","osint","rev-eng","forensics","sw-eng"],"img":"./images/icons8-python.svg",
    "desc":`My goto language, I am comfortable using it for a wide range of tasks including reverse engineering, exploit development, packet capture analysis, statistical data analysis, neural network development, web scraping.`},
    {"name":"C/C++","tags":["grid-item","mtrx","rev-eng","sw-eng", "vr"],"img":"./images/icons8-c++-48.png",
    "desc":`C was and always will be my first and favorite programming language, and gave me a strong understanding of the hardware/software interface and memory management.`},
    {"name":"Volatility","tags":["grid-item","forensics"],"img":"./images/icons8-detective-64.png",
    "desc":`Comfortable using the tool for information gathering from memory forensics.`},
    {"name":"x86 assembly","tags":["grid-item","plat-arch","mtrx","rev-eng","sw-eng","vr"],"img":"./images/icons8-microchip-48.png",
    "desc":`I am comfortable with reading and writing 32 bit and 64 bit assembly programs.`},
    {"name":"ARM assembly","tags":["grid-item","plat-arch","mtrx","rev-eng","vr"],"img":"./images/icons8-microchip-48.png",
    "desc":`I am capable of analyzing ARM instructions though not as comfortably as with x86.`},
    {"name":"Splunk","tags":["grid-item","ent-sec","ds-ml"],"img":"./images/splunk.png",
"desc":`Familiar with deployment architecture, logging pipelines and datamodels, custom app development and detection rule creation focussed around the Mitre Attack framework.`},
    {"name":"Azure","tags":["grid-item","ent-sec","plat-arch","ds-ml"],"img":"./images/icons8-azure-48.png",
    "desc":`Skills in Azure are focussed around Sentinel, data onboarding, detection rule creation, and response playbook automations.`},
// {"name":"CarbonBlack","tags":["grid-item","ent-sec"],"img":"./images/carbonblack.ico",
    // "desc":``},
    {"name":"ServiceNow","tags":["grid-item","ent-sec"],"img":"./images/servicenow.png",
    "desc":`Comfortable with the security operations and performance analytics suites, custom workflow action development, and integration with 3rd part data sources.`},
    {"name":"Windows internals","tags":["grid-item","rev-eng","forensics","vr"],"img":"./images/icons8-windows-10-48.png",
    "desc":`Familiar with the Windows API, low level data structures.`},
    {"name":"Linux internals","tags":["grid-item","mtrx","rev-eng","forensics","vr","sw-eng"],"img":"./images/icons8-linux-48.png",
    "desc":`Familiar with platform internals, kernel compilation, emulation using QEMU, system administration, and is my preferred daily driver and software development environment.`},
    {"name":"VBA","tags":["grid-item","rev-eng","sw-eng"],"img":"./images/864px-Microsoft_Office_2013_logo.png",
    "desc":`Practised in VBA development in Excel for data validation, analysis and presentation. Reverse engineering document malware.`},
    {"name":"Circuit design","tags":["grid-item","mtrx"],"img":"./images/icons8-robot-64.png",
    "desc":`Formal training in signal processing, power electronics for the purposes of mechatronic systems. My hobbies with microcontrollers keeps the practical knowledge fresh if not the mathematical theory.`},
    {"name":"Mechanical design","tags":["grid-item","mtrx"],"img":"./images/icons8-robot-64.png",
    "desc":`Static, dynamic analysis of mechanical systems using analytic and numerical techniques.`},
    {"name":"Control systems","tags":["grid-item","mtrx"],"img":"./images/icons8-robot-64.png",
    "desc":`Formal training in control theory for the purposes of mechatronic system planning and actuation.`},
    {"name":"Reinforcement learning","tags":["grid-item","ds-ml","mtrx"],"img":"./images/icons8-artificial-intelligence-64.png",
    "desc":`Familiar with Q learning, convolutional deep Q learning, and actor critic systems.`},
    {"name":"Neural networks","tags":["grid-item","ds-ml"],"img":"./images/icons8-artificial-intelligence-64.png",
    "desc":`Some experience with the design and construction of feed forward, recurrent and symmetrically connected neural network systems. Especially interesting topologies I have worked with include Boltzmann machines and deep autoencoders.`},
    {"name":"Arduino","tags":["grid-item","plat-arch","mtrx"],"img":"./images/icons8-arduino-48.png",
    "desc":`Mostly use arduinos for quick hardware hacks and electronics prototyping.`},
    {"name":"Raspberry pi","tags":["grid-item","plat-arch","mtrx"],"img":"./images/icons8-raspberry-pi-48.png",
    "desc":`Am a proud first gen Raspberry Pi owner and it was my portal into DIY electronics combined with the power of linux.`},
    {"name":"ESP 32","tags":["grid-item","plat-arch","mtrx"],"img":"./images/icons8-microchip-48.png",
    "desc":`Mostly experience revolves around Micropython on the board, for hobby electronics that require a small footprint and connectivity.`},
    {"name":"Java","tags":["grid-item","sw-eng"],"img":"./images/icons8-java-48.png",
    "desc":`My second programming language and was a great way to appreciate object oriented software design.`},
    {"name":"TensorFlow","tags":["grid-item","ds-ml"],"img":"./images/tensorflow.png",
    "desc":`Am comfortable with Tensorflow syntax for the design and construction of neural nets.`},
    {"name":"Pytorch","tags":["grid-item","ds-ml"],"img":"./images/pytorch.svg",
    "desc":`My preferred framework for the design and construction of neural nets.`},
    {"name":"MATLAB","tags":["grid-item","ds-ml","sw-eng","mtrx"],"img":"./images/icons8-matlab-64.png",
    "desc":`My preferred solution for numerical analysis due to intuitive large scale matrix operations.`},
    {"name":"Solidworks","tags":["grid-item","mtrx"],"img":"./images/icons8-solidworks-48.png",
    "desc":`Am comfortable using SolidWorks for CAD.`},
    {"name":"IDA","tags":["grid-item","rev-eng"],"img":"./images/Ida6-logo.png",
    "desc":`I am comfortable performing static analysis of malware samples and binary reversing.`},
    {"name":"Ghidra","tags":["grid-item","rev-eng","vr"],"img":"./images/ghidra.png",
    "desc":`My preferred tool for reverse engineering binaries across a large number of architectures.`},
    {"name":"Wireshark","tags":["grid-item","rev-eng","forensics"],"img":"./images/Wireshark_icon.png",
    "desc":`Comfortable performing quick network capture analysis, though I use Python and the Scapy library for more detailed investigations.`},
    {"name":"STM 32","tags":["grid-item","plat-arch","mtrx"],"img":"./images/icons8-microchip-48.png",
    "desc":``},
    {"name":"JavaScript","tags":["grid-item","rev-eng","sw-eng"],"img":"./images/icons8-javascript-48.png",
    "desc":`Comfortable with using javascript to create web pages and ServiceNow development. Some experience in Nodejs. This website utilizes p5.js for animation, Isotope.js for dynamic grid layouts and filtering, and jQuery for simplified DOM access and manipulation.`},
    {"name":"Android","tags":["grid-item","plat-arch","mtrx","vr"],"img":"./images/icons8-android-os-48.png",
    "desc":`Comfortable with android internals and source code, though probably not development of beautiful apps.`},
    {"name":"French","tags":["grid-item","languages"],"img":"./images/icons8-language-48.png",
    "desc":`Conversationally provicient (if you speak slowly).`},
    {"name":"Japanese","tags":["grid-item","languages"],"img":"./images/icons8-language-48.png",
    "desc":`Conversationally proficient, with less practise in the written form.`},
    {"name":"Mandarin","tags":["grid-item","languages"],"img":"./images/icons8-language-48.png",
    "desc":`Currently studying, with elementary proficiency.`},
    {"name":"Powershell","tags":["grid-item","ent-sec","rev-eng","sw-eng"],"img":"./images/icons8-windows-10-48.png",
    "desc":`Capable of analyzing malicious powershell scripts, and small scale development.`},
];
