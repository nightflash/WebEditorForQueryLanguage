class Suggester {
    constructor(field) {
        this.popUp = document.createElement('div');
        this.popUp.setAttribute('class', 'popUp');
        this.field = field;
        let styles = document.createElement('style');
        styles.innerText = `
            .suf, .pre { 
                color: grey; 
            } 
            .explanation { 
                border-top: 1px solid grey; 
                background-color: #f7f9fa;
                padding: 3px 16px 5px;
            }
            .popUp {
                
            }
            .suggestLine {
                
            }
            .separator {
                display: block;
                color: grey;
                padding: 0 16px 1px;
                border-top: 1px solid grey;
                font-size: 14px;
                text-align: right;
            }
            .container_suggest {
                padding: 3px 16px 5px;
            }
            .selected_suggest {
                background-color: #d4edff;
            }`;
        document.head.appendChild(styles);

        document.onkeydown = this.keyPress.bind(this);
    }

   async suggest(text, position) {
        if (text == null || text === "") {
            this.popUp.innerHTML = '';
            return;
        }
        let resp = await fetch('https://youtrack.jetbrains.com/rest/search/underlineAndSuggest?$top=-1&caret=' + position + '&query=' + text,
            {
                method: 'GET'
            });

        resp.text().then(res => {
            JSON.parse(res)['suggest']['items'].forEach( item => {
                let container = document.createElement('div');
                container.setAttribute('class', 'container_suggest');
                let suggestLine = document.createElement('span');
                suggestLine.setAttribute('class', 'suggestLine');
                if (item['sep'] === true) {
                    let separator = document.createElement('span');
                    separator.setAttribute('class', 'separator');
                    separator.innerText = item['d'];
                    this.popUp.appendChild(separator);
                }
                else {
                    let pre, suf;
                    if ('pre' in item) {
                        pre = document.createElement('span');
                        pre.setAttribute('class', 'pre');
                        pre.innerText = item['pre'];
                        container.appendChild(pre);
                        suf = document.createElement('span');
                        suf.setAttribute('class', 'suf');
                        suf.innerText = item['suf'];
                    }
                    suggestLine.innerHTML = item['o'].substring(0, item['ms']) + '<b>' + item['o'].substring(item['ms'], item['me'])
                                            + '</b>' + item['o'].substring(item['me']);
                    container.appendChild(suggestLine);
                    container.appendChild(suf);
                    this.popUp.appendChild(container);
                }
            })
        }).then(() => {
            let explanation = document.createElement('div');
            explanation.innerText = 'Press ↩ to complete selected item';
            explanation.setAttribute('class', 'explanation');
            this.popUp.appendChild(explanation);
        });

        this.popUp.innerText = "";
        let coords = this.field.getBoundingClientRect();
        let elem = document.getSelection().anchorNode.parentElement.getBoundingClientRect();
        this.popUp.setAttribute('style', 'position: absolute; text-align:left; ' +
            'background-color: white; z-index: 1; border: 1px solid #53a7ff; border-top: none; top: '
           + (coords.y + coords.height).toString() + 'px;' +
           'left: ' + (elem.x + elem.width - 10).toString() + 'px;');

        document.body.appendChild(this.popUp);
    }

    keyPress(key) {
        if (key.keyCode === 38 && !key.altKey) {

        }

        if (key.keyCode === 40 && !key.altKey) {

        }
    }
}

module.exports = Suggester;