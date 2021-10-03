// TODO тут будет имплементация Templater
class Templater {
    constructor() {}

    ocTag(children) {
        let tag = arguments[arguments.length - 1];
        let attr = arguments[arguments.length - 2];
        let text = '';

        if (arguments.length) {
            for (let i = 0; i < arguments.length - 1; i++) {
                let a = arguments[i];
                if (typeof a === 'function') {
                    text += a.toString();
                }

                if (typeof a === 'object' && a.hasOwnProperty('string')) {
                    text += a.toString();
                }

                if (typeof a === 'string') {
                    text += a;
                }
            }
        }

        let attributes = '';

        if (typeof attr === 'object' && !attr.hasOwnProperty('string')) {
            let keys = Object.keys(attr).sort();
            keys.forEach(key => {
                attributes += ` ${key}="${attr[key]}"`
            })
        }

        this.string += `<${tag}${attributes || ""}>${text || ""}</${tag}>`;
        let templater = new Templater(this.string);
        return templater;
    }

    div() {
        return this.ocTag(...arguments, 'div');
    }

    span() {
        return this.ocTag(...arguments, 'span');
    }

    p() {
        return this.ocTag(...arguments, 'p');
    }

    br(props) {
        if (props) {
            throw new Error("Uncaught Error: Nested content is not allowed");
        }
        this.string = `<br>`;
        let templater = new Templater(this.string);
        return templater;
    }

    toString() {
        return this.string;
    }
}

module.exports = function () {
    return new Templater()
}
