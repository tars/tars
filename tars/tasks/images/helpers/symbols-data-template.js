__iconsData: {
    <% _.forEach(icons, icon => { %>
        '<%= icon.name %>': {
            width: '<%= icon.width %>px',
            height: '<%= icon.height %>px'
        },
    <% }); %>
}
