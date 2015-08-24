export default function (src, type, charset, async) {
    var script = document.createElement('script');
    script.type = type || 'text/javascript';
    script.async = async || true;
    script.charset = charset || 'UTF-8';
    script.src = src;
    (document.getElementsByTagName('head')[0] || document.body).appendChild(script);
};
