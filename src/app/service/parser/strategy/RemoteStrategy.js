import ParsingStrategy from './ParsingStrategy';
import request from 'superagent';

export default class DOMParser extends ParsingStrategy {
    parseable(element) {
        return new Promise(function (resolve, reject) {
            var resource = element.dataset.resource;
            if (resource !== undefined && resource.length > 0) {
                resolve();
            } else {
                reject();
            }
        });
    }

    parse(element) {
        return new Promise(function (resolve, reject) {
            request
                .get(element.dataset.resource)
                .end(function(err, res){
                    if (err === null && res.ok) {
                        resolve(res.body);
                    } else {
                        reject(res.text);
                    }
                });
        });
    }
}
