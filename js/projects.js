jQuery.githubUser = function(username, callback) {
  jQuery.getJSON(
    "https://api.github.com/users/" + username + "/repos?callback=?", // Function that retrieves the repos.
    callback
  );
};

jQuery.fn.loadRepositories = function(username) {
  this.html(
    "<span>Pulling projects from my GitHub (" + username + ") repositories...</span>" // Placeholder for when we are retrieving the repos from GitHub.
  );

  var target = this; // Making the target the element where this function is being called from, in this case div id=githubProjects from projects.html
  $.githubUser(username, function(data) {
    var repos = data.data; // JSON Parsing
    sortByName(repos);

    var table = $("<table>"); // Creating a empty table as a variable.
    target.empty().append(table);
    table.append(
      '<tr><th>Project Name</th><th class="splitter-side">Project Description</th><th class="splitter-side">Source Code</th></tr>'// Appending the table headings to the table.
    );
    $(repos).each(function() { // for each repo, run the following code on them.
      if (this.name != username.toLowerCase() + ".github.com") {
        table.append( 
          '<tr><td>' +// Append a new row with a cell for the name and language together.
          this.name + // repo title.
          "<em>" +
          (this.language ? " (" + this.language + ")" : "") + // repo language
            "</em></td>" + // End that cell here
            '<td class="splitter-side">' + // Splitter-side class is just so I can add border left easier.
            this.description + // Create a new cell for the description of the current repo.
            "</td>" + // Cell end
            '<td class="splitter-side">' + // Again, new cell in the same row.
            '<a target="_blank" href="' + // Create a link that will open in a new tab.
            (this.homepage ? this.homepage : this.html_url) + // href link, project github page.
            '">View <i class="fas fa-link"></i></a></td></tr>' // Add the a element label which in this case is 'View' with a font awesome link symbol.
        ); // Therefore, this is simply parsing the JSON data we pull in into table cells for each repo, each repo being a row in the table with 3 cells for name, desc and source code.
      }
      table.append("</table>"); // Finally, finish the table tag so it becomes an actual table.
    });
  });

  function sortByName(repos) {
    repos.sort(function(a, b) {
      return a.name - b.name; // Sort the repos in alphabetical order.
    });
  }
};
