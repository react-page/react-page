import ParsingStrategy from './ParsingStrategy';
import request from 'superagent';
import isEmpty from 'lodash/lang/isEmpty';
import Editable from 'app/entity/Editable';

export default class DOMParser extends ParsingStrategy {
    parse(element) {
        return new Promise(function (resolve, reject) {
            var url = element.dataset.resource;
            if (isEmpty(url)) {
                reject({});
                return;
            }
            request.get(url).end((err, res) => {
                if (isEmpty(err)) {
                    resolve(new Editable(res.body));
                    return;
                }
                reject({message: err.text});
            });
        });
    }
}
