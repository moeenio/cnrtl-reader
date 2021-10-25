import {httpReject} from "../fetch-utils";
const domParser = new DOMParser();

class TlfiScraper {
    lookup(term) {
        return new Promise((resolve, reject) => {
            fetch(`https://locness-cors.duckdns.org/www.cnrtl.fr/definition/${term}`)
            .then(httpReject)
            .then(response => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
        })
    }

    getCleanResponseHtml(response) {
        return new Promise((resolve, reject) => {
            response.text()
            .then((responseText) => {
                const responseDom = domParser.parseFromString(responseText, "text/html")
                const responseCleanHtml = responseDom.getElementById("lexicontent").outerHTML;
                resolve(responseCleanHtml);
            })
            .catch((err) => {
                reject(err);
            })
            
        })
    }
}

export default TlfiScraper;