'use strict';

$(function() {
    let request = $.ajax({
        method: 'GET',
        url: 'people.json',
        dataType: 'json',
    });

    request.done(function(data) {
        let list = data.body.list;
        let resultBox = $('#result-box');
        let unorderedList = $('<ul>');
        resultBox.append(unorderedList);

        for (let person of list) {
            let listItem = $('<li>');
            listItem.text(person.name);
            listItem.attr('data-url', person.links[0].href);
            listItem.click(function() {
               let itemUrl = $(this).data('url');

                $.ajax({
                    method: 'GET',
                    url: itemUrl,
                    dataType: 'json'
                })
                .then((res) => {
                    const locationObj = res.body.art[0].location;

                    let loadedData = $('#loaded-data');
                    loadedData.empty();

                    let title = $('<li>');
                    title.text('Title: ' + res.head.title);

                    let type = $('<li>');
                    type.text('Type: ' + res.head.type);

                    let location = $('<li>');
                    location.text('Location: ' + locationObj.description );

                    let position = $('<li>');
                    position.text('Position: (' + locationObj.latitude + ', ' + locationObj.longitude + ')');

                    loadedData.append(title);
                    loadedData.append(type);
                    loadedData.append(location);
                    loadedData.append(position);
                });
            });
            unorderedList.append(listItem);
        }

    });

    request.fail(function(response) {
        console.log('ERROR:' + response.statusText);
    });
}); 
