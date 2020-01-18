jQuery.githubUser = function(username, callback) {
  jQuery.getJSON(
    "https://api.github.com/users/" + username + "/repos?callback=?",
    callback
  );
};

jQuery.fn.loadRepositories = function(username) {
  this.html(
    "<span>Querying GitHub for " + username + "'s repositories...</span>"
  );

  var target = this;
  $.githubUser(username, function(data) {
    var repos = data.data; // JSON Parsing
    sortByName(repos);

    var table = $("<table>");
    target.empty().append(table);
    table.append(
      '<tr><th>Project Name</th><th class="right-side">Project Description</th></tr>'
    );
    $(repos).each(function() {
      if (this.name != username.toLowerCase() + ".github.com") {
        table.append(
          '<tr><td><a target="_blank" href="' +
          (this.homepage ? this.homepage : this.html_url) + // href link
          '">' +
          this.name + // repo title.
          "</a><em>" +
          (this.language ? " (" + this.language + ")" : "") + // reoo language
            "</em></td>" +
            '<td class="right-side">' +
            this.description +
            "</td></tr>"
        );
      }
      table.append("</table>");
    });
  });

  function sortByName(repos) {
    repos.sort(function(a, b) {
      return a.name - b.name;
    });
  }
};
