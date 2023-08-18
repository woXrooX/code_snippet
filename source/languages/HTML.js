export default class HTML{
  static #tokens = null;

  static handle(code){
    HTML.#tokenize(code);
    return HTML.#renderHighlightedCode();
  }

  static #tokenize(code){
    const tokens = [];
    let current = 0;

    while(current < code.length){

      // '<'
      if(code.substring(current, current+4) === "&lt;"){
        tokens.push({type: 'symbol', value: '<'});

        current += 4;
        continue;
      }

      // '>'
      if(code.substring(current, current+4) === "&gt;"){
        tokens.push({type: 'symbol', value: '>'});

        current += 4;
        continue;
      }

      // '/'
      if(code[current] === '/'){
        tokens.push({type: 'symbol', value: '/'});

        current++;
        continue;
      }

      // =
      if(code[current] === '='){
        tokens.push({type: 'symbol', value: '='});

        current++;
        continue;
      }

      // Handle strings
      if(code[current] === '"' || code[current] === "'"){
        let string = `"`;
        let quote = code[current];

        while(code[++current] !== quote) string += code[current];

        string += `"`;

        tokens.push({type: 'string', value: string});

        current++;
        continue;
      }


      tokens.push({type: 'text', value: code[current]});

      current++;
    }

    HTML.#tokens = tokens;
  }

  static #renderHighlightedCode(){
    let html = '';

    for(const token of HTML.#tokens){
      let tokenHtml = '';

      switch(token.type){
        case 'symbol':
          tokenHtml = `<span style="color: white;">${token.value}</span>`;
          break;

        case 'string':
          tokenHtml = `<span style="color: hsla(124, 38%, 58%, 1);">${token.value}</span>`;
          break;

        case 'text':
          tokenHtml = `<span style="color: red;">${token.value}</span>`;
          break;

        default:
          tokenHtml = `<span>${token.value}</span>`;
      }

      html += tokenHtml;
    }

    return html;
  }
};
