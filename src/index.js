const mainModuleName = "main";
let currentModule = mainModuleName;
let modules = {};


async function start() {

    setTimeout(() => {
        _console.setup(console);
        console.info("-->3d Software Console");
    }, 100);

    let logo = document.getElementById("logo");

    var divEditor = ace.edit("divEditor");
    divEditor.setTheme("ace/theme/chaos");
    divEditor.session.setMode("ace/mode/javascript");
    divEditor.setOptions({
        fontSize: "12pt",
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
    });

    let main = await (await fetch("./runtime/index.js")).text();
    modules.main = main;

    divEditor.setValue(main);

    let divmodules = document.getElementById("divmodules");
    let rendermodules = () => {
        divmodules.innerHTML = '';
        for (let pageName in modules) {
            let divPage = document.createElement("div");
            divPage.style.backgroundColor = "#222";
            divPage.style.marginLeft = "0.5rem";
            divPage.style.borderRadius = "5px";
            divPage.style.padding = "0.25rem";
            divPage.style.cursor = "pointer";
            divPage.style.color = "white";
            divPage.innerHTML = pageName;
            divmodules.appendChild(divPage);
            divPage.addEventListener("click", () => {
                modules[currentModule] = divEditor.getValue();
                divEditor.setValue(modules[pageName])
                currentModule = pageName;
            });
        }
    }
    rendermodules();

    let divCreateModule = document.getElementById("divCreateModule");
    divCreateModule.addEventListener("click", () => {
        let moduleName = window.prompt("Module name");
        if (moduleName == undefined || moduleName == "") {
            alert("Please enter a valid module name");
            return;
        } else if (Object.keys(modules).includes(moduleName)) {
            alert("That module name already exists, please enter a valid module name");
            return;
        } else {
            modules[moduleName] = `console.log("${moduleName}");`;
            rendermodules();
        }
    });

    let divDeleteModule = document.getElementById("divDeleteModule");
    divDeleteModule.addEventListener("click", () => {
        if (currentModule != mainModuleName) {
            let confirmation = confirm(`Do you want to delete "${currentModule}" module ?`)
            if (confirmation) {
                delete modules[currentModule];
                rendermodules();
                divEditor.setValue(modules[mainModuleName]);
            }
        } else {
            alert(`You cannot delete ${mainModuleName} module`);
            return;
        }
    });

    let divExportProject = document.getElementById("divExportProject");
    divExportProject.addEventListener("click", () => module.exportProject(modules));

    let divImportProject = document.getElementById("divImportProject");
    divImportProject.addEventListener('click', async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = `application/${module.extension}`;
        const click = async function () {
            modules = await module.importProject(event);
            rendermodules();
            divEditor.setValue(modules[mainModuleName]);
            for (let module of Object.keys(modules)) {
                console.info(`Imported: ${module} module`)
            }
        }
        input.addEventListener("change", click);
        input.click();
    });

    let divPlay = document.getElementById("divPlay");
    divPlay.addEventListener("click", () => render(divEditor));

    loading.show();
    await utils.wait(3000);
    render(divEditor);
    await utils.wait(2000);
    loading.hide();
}
start();

async function render(divEditor) {
    let iframe = document.getElementById("iframe");
    let iframeDocument = iframe.contentWindow.document;
    iframeDocument.location.reload();
    await utils.wait(500);
    iframeDocument = iframe.contentWindow.document;
    _console.setup(iframe.contentWindow.console);
    modules[currentModule] = divEditor.getValue();
    for (let moduleName of Object.keys(modules)) {
        const script = iframeDocument.createElement('script');
        script.type = "module";
        script.textContent = modules[moduleName]; // JavaScript code for iframe
        iframeDocument.head.appendChild(script);
    }
    await utils.wait(5000);
    logo.classList.toggle("animation");
}