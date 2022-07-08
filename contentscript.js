(function(){
    if(document.getElementById('SandboxFlag') != null || document.cookie.match('sid=([^;]*)')[1] == null)
    return;
    
    sforce.connection.sessionId = document.cookie.match('sid=([^;]*)')[1];

    var companyInfo = sforce.connection.query('SELECT Id, Name, InstanceName, IsSandbox FROM Organization').getArray('records')[0];

    if(localStorage.getItem('SandboxFlag ' + companyInfo.Id) == null){
        var hexColour = (companyInfo.IsSandbox == 'true' ? 'red' : 'blue' );
        var info = { name: companyInfo.Name, hex: hexColour}
        localStorage.setItem('SandboxFlag ' + companyInfo.Id, JSON.stringify(info));
    }

    var data = JSON.parse(localStorage.getItem('SandboxFlag ' + companyInfo.Id));

    if(document.getElementById('globalHeaderBar') != null){
        document.getElementById('contentWrapper').style.margin = '30px 0 0 0';
    } else {
        document.getElementById('contentWrapper').style.padding = '30px 0 0 0';
    }

    var child = document.createElement('span');
    child.className = 'pageMsg textOnly normalImportance';
    child.style = 'position: fixed; width: 100%; top: 0%; right: 0%; left: -1%; z-index: 2147483647; text-align: center; font-weight: bold; height: 28px; font-size: large; background-color: ' + data.hex + ';';

    var reload = document.createElement('span');
    reload.id = 'reload' + companyInfo.Id;
    reload.innerHTML = '&#8635;&nbsp;&nbsp;';

    var content = document.createElement('span');
    content.className = 'subMsg normalImportance';
    content.innerHTML = (companyInfo.IsSandbox == 'true' ? 'Sandbox: ' : 'Production: ' ) + data.name + ' ';

    child.appendChild(reload);
    child.appendChild(content);

    var input = document.createElement('input');
    input.id = 'input' + companyInfo.Id;
    input.value = data.hex;
    input.type = 'text';
    input.placeholder = 'Hex Code/Colour';
    
    child.appendChild(input);

    var css = '#input' + companyInfo.Id + ' {\r\n' +
    '   background: none;\r\n' +
    '   border: none;\r\n' +
    '   color: white;\r\n' +
    '   text-align: center;\r\n' +
    '   cursor: pointer;\r\n' +
    '   font-size: large;\r\n' +
    '}\r\n' +
    '#input' + companyInfo.Id + ':focus, .input' + companyInfo.Id + ':hover {\r\n' +
    '   background: white !Important;\r\n' +
    '   color: black !Important;\r\n' +
    '} ';

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if(style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    var parent = document.createElement('div');
    parent.className = 'msgContent';
    parent.id = 'SandboxFlag'

    parent.appendChild(child);

    var messages = document.getElementsByClassName('messages')[0];

    messages.appendChild(parent);

    var script = document.createElement('script');
    script.type = 'text/javascript';

    var code = 'var elem = document.getElementById(\'input' + companyInfo.Id + '\');\r\n' +
    'elem.onchange = changeValue;' +
    '\r\n\r\n' +
    'var elem2 = document.getElementById(\'reload' + companyInfo.Id + '\');\r\n' +
    'elem2.onclick = refresh;' +
    '\r\n\r\n' +
    'function changeValue(){\r\n' +
    '   localStorage.setItem(\'SandboxFlag ' + companyInfo.Id + '\', JSON.stringify({ name: \'' + companyInfo.Name + '\', hex: document.getElementById(\'input' + companyInfo.Id + '\').value}));\r\n' +
    '   \r\n' +
    '   if(confirm(\'Your new colour has been set, would you like to refresh the page?\'))\r\n' +
    '       location.reload();\r\n' +
    '}' +
    '\r\n\r\n' +
    'function refresh(){\r\n' +
    '   localStorage.setItem(\'SandboxFlag ' + companyInfo.Id + '\', JSON.stringify({ name: \'' + companyInfo.Name + '\', hex: \'' + data.hex + '\'}));\r\n' +
    '   \r\n' +
    '   if(confirm(\'The content refresh has completed, would you like to refresh the page?\'))\r\n' +
    '       location.reload();\r\n' +
    '}';;

    try {
      script.appendChild(document.createTextNode(code));
      document.body.appendChild(script);
    } catch (e) {
      script.text = code;
      document.body.appendChild(script);
    }
})();