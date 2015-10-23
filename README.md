## $.Table Edits

[![File Size](https://badge-size.herokuapp.com/nathancahill/table-edits/master/build/table-edits.min.js.svg?compression=gzip&label=size)](https://raw.githubusercontent.com/nathancahill/table-edits/master/build/table-edits.min.js)

Table Edits is a lightweight jQuery plugin for making table rows editable. Built as minimally as possible so it's easy to extend. [Demo](http://nathancahill.github.io/table-edits/)

__Table Edits__ only does a couple things:

- Replaces cell values with input fields on edit
- Handles row editing state
- Fires callbacks for edit, save and cancel

And __optionally__, a couple more:

- Binds a button or double click to start editing
- Binds enter and escape keys to save and cancel
- Maintains column widths when switching to edit
- Create select fields instead of input fields

#### Options

```
$("table tr").editable({
    keyboard: true,
    dblclick: true,
    button: true,
    buttonSelector: ".edit",
    dropdowns: {},
    maintainWidth: true,
    edit: function(values) {},
    save: function(values) {},
    cancel: function(values) {}
});
```

#### Markup

The only additional markup __Table Edits__ requires is a `data-field` attribute on each editable cell with it's column name:

```
<table>
    <tr>
        <td data-field="name">Dave Gamache</td>
        <td data-field="age">26</td>
        <td data-field="sex">Male</td>
        <td>
            <a class="edit>Edit</a>
        </td>
    </tr>
<table>
```

The last cell will not become editable because it does not have the `data-field` attribute.

#### Saving Table Data

Table Edits makes it easy to save edits. Callbacks are passed a `values` object with column names and values of the edited row.

Posting the new data to an API endpoint is simple.

```
$("table tr").editable({
    save: function(values) {
      var id = $(this).data('id');
      $.post('/api/object/' + id, values);
    }
});
```
