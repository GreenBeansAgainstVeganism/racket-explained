
window.addEventListener('load', () => {
    const outbox = document.getElementById('outbox');
    const codebox = document.getElementById('codebox');
    const gobutton = document.getElementById('gobutton');

    // Add listener for gobutton
    gobutton.addEventListener('click', () => {
        // Generate output html
        outbox.innerHTML = formatBrackets(escapeHTML(codebox.value));

        // Add listeners for all the spans to outline them on hover, since the css hover
        // doesn't allow stop propogation
        [...outbox.getElementsByTagName('span')].forEach(item => {
            item.addEventListener('mouseover', (ev) => {
                item.classList.add('hover');
                ev.stopPropagation();
            });
            item.addEventListener('mouseout', (ev) => {
                item.classList.remove('hover');
            });
        });
    });
});

/**
 * Escapes necessary characters in a piece of text to make sure it is not interpreted as HTML code.
 * @param {String} raw The text to be processed
 * @returns The same text with all HTML special characters converted to HTML entities
 */
function escapeHTML(raw) {
    return raw.replace(/[&<"']/g, function (m) {
        switch (m)
        {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '"':
                return '&quot;';
            default:
                return '&#039;';
        }
    });
}

// The colors that different levels of brackets should be painted
const COLORS = ['#FFD1D1', '#FFE7D1', '#FEFFD1', '#E5FFD1', '#D1FEFF', '#D1E6FF', '#DCD1FF'];

/**
 * Formats a piece of text with HTML span tags to highlight each bracketed group in a different color.
 * @param {String} raw The text to be processed
 * @returns The same text with HTML span tags inserted to highlight different bracketed groups in different colors
 */
function formatBrackets(raw) {
    // stack to keep track of brackets we are currently inside
    let brackets = [];

    // split the text at the points where we might want to insert html:
    // before opening brackets and after closing brackets
    let pieces = raw.split(/(?=[(\[])|(?<=[)\]])/);
    console.log(pieces);

    for (let i = 0; i < pieces.length; i++)
    {
        const openb = pieces[i].match(/^[(\[]/);
        const closeb = pieces[i].match(/[)\]]$/);
        if (openb)
        {

            // insert opening html tag before
            pieces[i] = `<span style="background-color:${COLORS[brackets.length % COLORS.length]}">`.concat(pieces[i]);

            // push openb to the stack
            brackets.push(openb[0]);
        }
        if (closeb)
        {
            if (matchParen(brackets[brackets.length - 1], closeb[0]))
            {
                // insert closing html tag after
                pieces[i] = pieces[i].concat('</span>');

                // pop from the stack
                brackets.pop();
            }
            else
            {
                pieces[i] = pieces[i].concat('<span class="error">mismatched parentheses</span>');
            }
        }
    }

    // if not all parentheses were closed
    if (brackets.length)
    {
        pieces.push('<span class="error">unmatched parentheses</span>')
    }

    return pieces.join('');
}

/**
 * Simple helper function to test if two characters form a matching pair of brackets
 * @param {char} open opening bracket character
 * @param {char} close closing bracket character
 * @returns whether the two characters form a matching pair of brackets
 */
function matchParen(open, close) {
    switch (open)
    {
        case '(': return close === ')';
        case '[': return close === ']';
        default: return false;
    }
}