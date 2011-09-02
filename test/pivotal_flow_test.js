test("should load the branches correctly", function() {
  loadTestTableFixture(testTable1());

  sut = new PivotalFlow();

  equal(sut.branches.length, 2);
  equal(sut.branches[0].name, "chore_16191909");
  equal(sut.branches[1].name, "story_16191911");
});

test("should create the correct pivotal link for each item", function() {
  loadTestTableFixture(testTable1());

  sut = new PivotalFlow();

  equal(sut.branches[0].url, "https://www.pivotaltracker.com/story/show/16191909");
  equal(sut.branches[1].url, "https://www.pivotaltracker.com/story/show/16191911");
});


test("loading a completely different table should load a different set of links", function() {
  loadTestTableFixture(testTable2());

  sut = new PivotalFlow();

  equal(sut.branches[0].name, "chore_16191611");
  equal(sut.branches[0].url, "https://www.pivotaltracker.com/story/show/16191611");
});

test("should add a link to the pivotal story", function() {
  loadTestTableFixture(testTable1());

  sut = new PivotalFlow();

  equal(sut.branches[0].element.html(), '<a href="https://www.pivotaltracker.com/story/show/16191909" class="pivotal_flow_link" target="_blank">pivotal</a> <a href="/bigbangtechnology/repo/tree/chore_16191909">chore_16191909</a>');
});

function loadTestTableFixture(html) {
  jQuery('#qunit-fixture').html(html);
}

function testTable1() {
  return "\
   <table class='branches'>\
    <tr>\
      <td class='name'>\
        <h3><a href='/bigbangtechnology/repo/tree/chore_16191909'>chore_16191909</a></h3>\
      </td>\
    </tr>\
    <tr>\
      <td class='name'>\
        <h3><a href='/bigbangtechnology/repo/tree/development'>development</a></h3>\
      </td>\
    </tr>\
    <tr>\
      <td class='name'>\
        <h3><a href='/bigbangtechnology/repo/tree/story_16191911'>story_16191911</a></h3>\
      </td>\
    </tr>\
  </table>"
}

function testTable2() {
  return "\
   <table class='branches'>\
    <tr>\
      <td class='name'>\
        <h3><a href='/bigbangtechnology/repo/tree/chore_16191611'>chore_16191611</a></h3>\
      </td>\
    </tr>\
    <tr>\
      <td class='name'>\
        <h3><a href='/bigbangtechnology/repo/tree/development'>development</a></h3>\
      </td>\
    </tr>\
    <tr>\
      <td class='name'>\
        <h3><a href='/bigbangtechnology/repo/tree/story_16191211'>story_16191211</a></h3>\
      </td>\
    </tr>\
  </table>"
}
