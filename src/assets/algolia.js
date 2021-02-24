const client = algoliasearch('UINQ2M4D9S', '636b6d9e2dfb207e89ea7344859848f9');
const players = client.initIndex('segment-docs');

autocomplete(
  '#autocomplete',
  {
    debug: true,
    keyboardShortcuts: ['s',191],
    templates: {
      dropdownMenu:
        '<div class="aa-dataset-article"></div>'
    },
  },
  [
    {
      source: autocomplete.sources.hits(players, {hitsPerPage: 7}),
      displayKey: 'title',
      name: 'article',
      templates: {
        suggestion({_highlightResult, headings, url, anchor, _snippetResult, content}) {
          if (anchor != null) {
            var anchorLink = "#"+anchor;
          }else {
            var anchorLink = "";
          }
          return `<a class="aa-link" href="/docs${url}${anchorLink}">
                  <p class="aa-title" >${_highlightResult.title.value}</h3>
                  <p class="aa-heading">${headings.join(' >')}</p>
                  <p class="aa-content">${_snippetResult.content.value}</p></a>
                `;
        },
        empty: '<div class="aa-empty">No matching results</div>',
      },
    },
  ]
);

window.addEventListener('/', (e)=>{
  window.scrollTo(0,0);
});