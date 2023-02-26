
window.addEventListener('load', () => {

    // Dynamically populate page-nav-menu with links to all h3 tags on the page
    const h3tags = [...document.getElementById('content').getElementsByTagName('h3')];
    const pageNav = document.getElementById('page-nav-menu');
    const pageNavLinks = document.getElementById('page-nav-links');

    // Necessary event listener to make the side menu work with touch devices
    document.body.addEventListener('touchend', ev => {
        pageNav.classList.toggle('active',pageNav.contains(ev.target));
    })

    if (pageNavLinks != null)
    {
        if (h3tags.length > 1)
        {
            h3tags.forEach(h => {
                const l = document.createElement('a');
                l.innerText = h.innerText;
                if (h.id != '')
                {
                    l.href = '#' + h.id;
                }
                const child = document.createElement('li');
                child.appendChild(l);
                pageNavLinks.appendChild(child);
            });
        }
        else
        {
            pageNav.style.visibility = 'hidden';
        }
    }

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
        foldl: 'functionguide.html#func-andmap',
        'functional programming': 'faq.html#what-is-functional-programming',
        environment: 'faq.html#what-is-an-environment',
        bind: 'faq.html#what-is-an-environment',
        binds: 'faq.html#what-is-an-environment',
        identifier: 'faq.html#what-is-an-environment',
        identifiers: 'faq.html#what-is-an-environment',
        quoting: 'faq.html#what-is-quoting',
        symbol: 'faq.html#what-is-a-symbol'
    }
    const sections = [...document.getElementsByClassName('linkgen')];
    sections.forEach(s => {
        // Get the url that corresponds with this keyword
        const href = keywords[s.innerHTML.toLowerCase()];
        // If the keyword exists, replace this tag with an anchor, otherwise remove the tag
        s.outerHTML = href ? `<a href="${href}">${s.innerHTML}</a>` : s.innerHTML;
    });

});