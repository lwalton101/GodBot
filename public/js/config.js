const configDiv = document.getElementById("configDiv");
function OnInput(e){
    console.log(e.target.id);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "optionName": e.target.id,
        "value": e.target.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/config/setConfigValue", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function CreateConfigEditor(name, value){
    let configEditorDiv = document.createElement("div");

    let configValueName = document.createElement("p")
    configValueName.textContent = name;

    let configValue = document.createElement("input")
    configValue.value = value;
    configValue.id = name;
    configValue.oninput = OnInput;

    configEditorDiv.appendChild(configValueName).appendChild(configValue);
    configDiv.appendChild(configEditorDiv)
}

function RefreshConfigOptions(){
    while (configDiv.firstChild) {
        configDiv.removeChild(configDiv.firstChild);
    }

    fetch("/config/getConfigData").then(response => {
        response.json().then(obj => {
            for(let name in obj.configValues){
                CreateConfigEditor(name, obj.configValues[name])
            }

        })
    });
}
RefreshConfigOptions()

