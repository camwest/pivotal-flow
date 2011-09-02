(function() {
  var PivotalFlow = (function() {
    PIVOTAL_REGEXP = /(.*)_(.*)/;
    PIVOTAL_LINK_CLASS = "pivotal_flow_link"

    function PivotalFlow() {
      this.branches = [];

      this.parseBranches();
      this.addLinks();
    }

    PivotalFlow.prototype.parseBranches = function() {
      var that = this;

      $('table.branches td.name').each(function(index) {
        var branchName = $(this).find('a').html();
        var match = branchName.match(PIVOTAL_REGEXP);
        var element = $(this).find('h3');

        if (match) {
          console.log("MATCH FOUND!");
          console.log(match);
          that.addBranch(match, element);
        }
      });
    }

    PivotalFlow.prototype.addBranch = function(match, element) {
      var branchName = match[0];
      var storyId = match[2];

      this.branches.push({
        name: branchName,
        url: urlForStoryId(storyId),
        element: element
      });
    }

    function urlForStoryId(storyId) {
      return "https://www.pivotaltracker.com/story/show/" + storyId;
    }

    PivotalFlow.prototype.addLinks = function() {
      for (var i=0; i < this.branches.length; i++) {
        var branch = this.branches[i];
        branch.element.find('a').before(anchorForBranch(branch));
      }
    }

    function anchorForBranch(branch) {
      return '<a href="' + branch.url + '" class="' + PIVOTAL_LINK_CLASS + '" target="_blank">pivotal</a> ';
    }

    return PivotalFlow;
  })();

  window['PivotalFlow'] = PivotalFlow;
}).call(this);
