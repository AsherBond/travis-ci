beforeEach(function() {
  this.addMatchers({
    toMatch: function(pattern) {
      this.actual = $(this.actual);
      return this.actual.match(pattern);
    },
    toBeEmpty: function() {
      this.actual = $(this.actual);
      return this.actual.length == 0;
    },
    toFind: function(selector) {
      this.actual = $(this.actual);
      return this.actual.find(selector).length != 0;
    },
    toHaveTexts: function(texts) {
      this.actual = $(this.actual);
      var errors = [];
      _.each(texts, function(text, selector) {
        var actual = $.trim($(this.actual).find(selector).text());
        if(!jasmine.doesMatchText(actual, text)) {
          errors.push('expected the element ' + selector + ' to have the text "' + text +'", but actually has: "' + actual + '".');
        }
      }.bind(this));
      this.message = function() { return errors.join("\n") };
      return errors.length == 0;
    },
    toHaveText: function(text) {
      this.actual = $(this.actual);
      var actual = $.trim($(this.actual).text());
      this.message = function() {
        return 'expected the element ' + this.actual.selector + ' to have the text "' + text +'", but actually has: "' + actual + '".';
      }
      return jasmine.doesMatchText(actual, text);
    },
    toHaveDomAttributes: function(attributes) {
      this.actual = $(this.actual);
      var errors = [];
      _.each(attributes, function(attributes, selector) {
        _.each(attributes, function(value, name) {
          var actual = $.trim($(this.actual).find(selector).attr(name));
          if(typeof text == 'function' ? !actual.test(value) :  actual != value) {
            errors.push('expected the element ' + selector + ' to have the attribute ' + name + '=' + value +', but actually has: "' + actual + '".');
          }
        }.bind(this));
      }.bind(this));
      this.message = function() { return errors.join("\n") };
      return errors.length == 0;
    },
    toMatchTable: function(table) {
      // table = $.clone(table);

      this.actual = $(this.actual);
      var errors = [];
      var headers = table.shift();

      $.each(headers, function(ix, text) {
        var selector = 'thead th:nth-child(' + (ix + 1) + ')';
        var actual = $.trim($(this.actual).find(selector).text());
        if(!jasmine.doesMatchText(actual, text)) {
          errors.push('expected the header ' + ix + ' to have the text "' + text + '", but actually has: "' + actual + '".');
        }
      }.bind(this));

      $.each(table, function(row, cells) {
        $.each(cells, function(cell, text) {
          var selector = 'tbody tr:nth-child(' + (row + 1) + ') td:nth-child(' + (cell + 1) + ')';
          var actual = this.actual.find(selector).text();
          if(!jasmine.doesMatchText(actual, text)) {
            errors.push('expected the cell "' + headers[cell] + '" in row ' + row + ' to have the text "' + text + '", but actually has: "' + actual + '".');
          }
        }.bind(this));
      }.bind(this));

      this.message = function() { return errors.join("\n"); }
      return errors.length == 0;
    },
  });
});

jasmine.doesMatchText = function (lft, rgt) {
  if(lft == 'undefined') {
    return rgt === undefined;
  } else if(typeof rgt === 'function') {
    return rgt.test(lft);
  } else {
    return lft == rgt;
  }
}


