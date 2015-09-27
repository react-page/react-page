import ParsingStrategy from './ParsingStrategy';
import request from 'superagent';
import isEmpty from 'lodash/lang/isEmpty';

function parseable(element) {
    return new Promise(function (resolve, reject) {
        var resource = element.dataset.resource || {};
        if (resource.length > 0) {
            resolve();
        } else {
            reject();
        }
    });
}

export default class DOMParser extends ParsingStrategy {
    parse(element) {
        var attr = element.attributes;

        return new Promise(function (resolve, reject) {
            parseable(element).then(() => {
                request.get(element.dataset.resource)
                    .end((err, res) => isEmpty(err) ? resolve(res) : reject({message: res.text}));
            }).catch(() => {
                reject()
            });
        });
    }
}
