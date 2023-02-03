
window.onload = () => {

    // Dynamically generate links for all the labelled areas
    const keywords = {
        procedure: 'faq.html#what-is-a-procedure',
        procedures: 'faq.html#what-is-a-procedure',
        proc: 'faq.html#what-is-a-procedure',
        list: 'faq.html#what-are-pairs-and-lists',
        lists: 'faq.html#what-are-pairs-and-lists',
        pair: 'faq.html#what-are-pairs-and-lists',
        pairs: 'faq.html#what-are-pairs-and-lists',
        racket: 'faq.html#what-is-racket',
        lisp: 'faq.html#lisp-dialects',
        lambda: 'functionguide.html#func-lambda',
        define: 'functionguide.html#func-define',
        map: 'functionguide.html#func-map',
        curry: 'functionguide.html#func-curry',
        andmap: 'functionguide.html#func-andmap',
        ormap: 'functionguide.html#func-andmap',
        'functional programming': 'faq.html#what-is-functional-programming',
        environment: 'faq.html#what-is-an-environment',
        bind: 'faq.html#what-is-an-environment',
        binds: 'faq.html#what-is-an-environment',
    }
    const sections = [...document.getElementsByClassName('linkgen')];
    sections.forEach(s=>{
        // Get the url that corresponds with this keyword
        const href = keywords[s.innerHTML.toLowerCase()];
        // If the keyword exists, replace this tag with an anchor, otherwise remove the tag
        s.outerHTML = href ? `<a href="${href}">${s.innerHTML}</a>` : s.innerHTML;
    });
};