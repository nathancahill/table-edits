
describe('Table-Edits', function() {
    beforeEach(function() {
        this.table = document.createElement('table');
        this.row = document.createElement('tr');
        this.cell = document.createElement('td');
        this.cell.innerHTML = 'Hello World';
        this.cell.setAttribute('data-field', 'message');
        this.editCell = document.createElement('td');
        this.edit = document.createElement('a');
        this.edit.setAttribute('class', 'edit');

        document.body.appendChild(this.table)
        this.table.appendChild(this.row);
        this.row.appendChild(this.cell);
        this.row.appendChild(this.editCell);
        this.editCell.appendChild(this.edit);
    });

    afterEach(function() {
        document.body.removeChild(this.table);
    });

    it('does not change values when initiated', function() {
        $('table tr').editable();

        expect(this.cell.innerHTML).toBe('Hello World');
    });

    it('replaces cell values with input fields on edit', function() {
        $('table tr').editable();

        this.edit.click();

        expect(this.cell.firstChild.tagName.toLowerCase()).toBe('input');
    });

    it('sets input values to table cell values on edit', function() {
        $('table tr').editable();

        this.edit.click();

        expect(this.cell.firstChild.value).toBe('Hello World');
    });

    it('triggers an edit on double click', function() {
        $('table tr').editable();

        $(this.row).dblclick();

        expect(this.cell.firstChild.tagName.toLowerCase()).toBe('input');
    });

    it('saves values on when edit is clicked again', function() {
        $('table tr').editable();

        this.edit.click();
        this.cell.firstChild.value = 'Hi there!';
        this.edit.click();

        expect(this.cell.innerHTML).toBe('Hi there!');
    });

    it('disables button when button is false', function() {
        $('table tr').editable({
            button: false
        });

        this.edit.click();

        expect(this.cell.innerHTML).toBe('Hello World');
    });

    it('allows button selector to change', function() {
        this.edit.setAttribute('class', 'change');

        $('table tr').editable({
            buttonSelector: '.change'
        });

        this.edit.click();

        expect(this.cell.firstChild.tagName.toLowerCase()).toBe('input');
    });

    it('maintians width on edit', function() {
        $('table tr').editable();

        var width = this.editCell.clientWidth;

        this.edit.click();

        expect(this.editCell.clientWidth).toBe(width);
    });

    it('supports dropdowns', function() {
        $('table tr').editable({
            dropdowns: {
                message: [
                    'Hello World',
                    'Hi there!'
                ]
            }
        });

        this.edit.click();

        expect(this.cell.firstChild.tagName.toLowerCase()).toBe('select');
    });

    it('does not bind fields without data-field attribute', function() {
        this.edit.removeAttribute('data-field');

        $('table tr').editable();

        expect(this.cell.innerHTML).toBe('Hello World');
    });

    it('support the enter key for save', function() {
        $('table tr').editable();

        this.edit.click();
        this.cell.firstChild.value = 'Hi there!';

        var e = $.Event('keydown');
        e.which = 13;

        $(this.cell.firstChild).trigger(e);

        expect(this.cell.innerHTML).toBe('Hi there!');
    });

    it('support the escape key for cancel', function() {
        $('table tr').editable();

        this.edit.click();
        this.cell.firstChild.value = 'Hi there!';

        var e = $.Event('keydown');
        e.which = 27;

        $(this.cell.firstChild).trigger(e);

        expect(this.cell.innerHTML).toBe('Hello World');
    });

    it('disables keyboard when keyboard is false', function() {
        $('table tr').editable({
            keyboard: false
        });

        this.edit.click();
        this.cell.firstChild.value = 'Hi there!';

        var e = $.Event('keydown');
        e.which = 13;

        $(this.cell.firstChild).trigger(e);

        expect(this.cell.firstChild.tagName.toLowerCase()).toBe('input');
    });

    it('calls the edit callback on edit', function() {
        var spy = {
            callback: function (values) {}
        }

        spyOn(spy, 'callback');

        $('table tr').editable({
            edit: spy.callback
        });

        this.edit.click();

        expect(spy.callback).toHaveBeenCalledWith({'message': 'Hello World'});
    });

    it('calls the save callback on save', function() {
        var spy = {
            callback: function (values) {}
        }

        spyOn(spy, 'callback');

        $('table tr').editable({
            save: spy.callback
        });

        this.edit.click();
        this.cell.firstChild.value = 'Hi there!';
        this.edit.click();

        expect(spy.callback).toHaveBeenCalledWith({'message': 'Hi there!'});
    });

    it('calls the cancel callback on cancel', function() {
        var spy = {
            callback: function (values) {}
        }

        spyOn(spy, 'callback');

        $('table tr').editable({
            cancel: spy.callback
        });

        this.edit.click();
        this.cell.firstChild.value = 'Hi there!';

        var e = $.Event('keydown');
        e.which = 27;

        $(this.cell.firstChild).trigger(e);

        expect(spy.callback).toHaveBeenCalledWith({'message': 'Hello World'});
    });
});
