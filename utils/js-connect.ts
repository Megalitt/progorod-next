export const jsConnectInBody = (bannerHtml) => {
  const range = document.createRange();
  const divWrap = document.createElement('div');
  divWrap.appendChild(range.createContextualFragment(bannerHtml));

  const scriptConnected = [];
  const scriptTagsInWrap = divWrap.querySelectorAll('script[src]');
  const scriptsSrc = Array.from(new Set());

  for (let i = 0; i < scriptTagsInWrap.length; i += 1) {
    scriptsSrc.push(scriptTagsInWrap[i].getAttribute('src'));
    const scriptSrc: any = scriptsSrc[i];

    const scripts = Array.from(document.querySelectorAll('script')).map((scr) => scr.src);

    if (!scripts.includes(scriptSrc)) {
      scriptConnected.push(scriptTagsInWrap[i]);
    }
  }

  return scriptConnected;
};

export const jsSrcConnectInHead = (stringHtml) => {
  if (stringHtml) {
    //Получаем теги <script> содержащие атрибут src
    const scriptWithSrc = stringHtml.match(/\s*<script\s*[^>]*><\s*\/\s*script>/gim);
  
    for (let i = 0; i < scriptWithSrc.length; i += 1) {
      //Получаем атрибут src у каждого тега <script>
      const srcFromScriptTag = /<script.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/g.exec(scriptWithSrc[i])[1];
      
      //Делаем выборку тега <script> по имени атрибута src
      const isScriptConnected = document.querySelector(`script[src="${srcFromScriptTag}"]`);

      //Проверяем наличие тега <script>, чтобы исключить подключение одинаковых js файлов.
      if (!isScriptConnected) {
        let attributeConcat = '';

        //Получаем у каждого тега <script> его атрибуты
        const getAllAttributesFromTagScript = scriptWithSrc[i].match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/gmi);

        //Собираем в строку все атрибуты методом конкатенации
        for(let j = 0; j < getAllAttributesFromTagScript.length; j += 1) {
          attributeConcat+= ` ${getAllAttributesFromTagScript[j]}`
        }
   
        const rangeCounters = document.createRange();
        //Добавляем атрибуты к тегу <script>
        const headScripts = `<script${attributeConcat} data-id="${i}" async></script>`;
        //Отправляем получившийся код на render в head <script>
        document.head.prepend(rangeCounters.createContextualFragment(headScripts));
      }
    }
  }
};

export const jsInnerScriptConnectInHead = (stringHtml) => {
  if (stringHtml) {
    let scriptsArr = stringHtml.split(/<script[^>]*>/).join('</script>').split('</script>'),
        scriptCodeFromScriptTags = '';
    for (let i = 1; i < scriptsArr.length; i += 1) {
      scriptCodeFromScriptTags += scriptsArr[i];
    }

    const allScriptWithoutSrc = document.querySelectorAll('script');
    for (let i = 0; i < allScriptWithoutSrc.length; i += 1) {
      if (allScriptWithoutSrc[i].textContent.replace(/\s/g, '') === scriptCodeFromScriptTags.replace(/\s/g, '')) {
        return false;
      }
    }
    const scriptTag = document.createElement('script');
    scriptTag.textContent = scriptCodeFromScriptTags;
    const scriptsWrap = document.querySelector('#body-scripts');

    if (scriptsWrap) {
      scriptsWrap.append(scriptTag);   
    }
  }
};