/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */


/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
		/* This is our first test suite - a test suite just contains
		* a related set of tests. This suite is all about the RSS
		* feeds definitions, the allFeeds variable in our application.
		*/
		describe("RSS Feeds", function() {
			/* This is our first test - it tests to make sure that the
			 * allFeeds variable has been defined and that it is not
			 * empty. Experiment with this before you get started on
			 * the rest of this project. What happens when you change
			 * allFeeds in app.js to be an empty array and refresh the
			 * page?
			 */
			it('are defined', function() {
					expect(allFeeds).toBeDefined();
					expect(allFeeds.length).not.toBe(0);
			});

			/* Loop through each feed in the allFeeds object and ensure
			 * it has a URL defined and that the URL is not empty.
			 */
			it('all should have a URL', function() {
					for (var i = 0; i < allFeeds.length; i++){
						expect(allFeeds[i].url).toBeDefined();
						expect(allFeeds[i].url.length).toBeGreaterThan(0);
					}
			});

			/* Loop through each feed in the allFeeds object and ensure
			 * it has a name defined and that the name is not empty.
			 */
			 it('all should have a name', function() {
					for (var i = 0; i < allFeeds.length; i++){
						expect(allFeeds[i].name).toBeDefined();
						expect(allFeeds[i].name.length).toBeGreaterThan(0);
					}
			});
		});


		describe("The Menu", function() {
			// Ensure the menu element is hidden by default.
			it ('should be hidden by default', function() {
				expect($('.menu-hidden').hasClass('menu-hidden')).toBe(true);
			});

			// Ensure the menu bar is shown when clicked.
			it ('should shown when icon is clicked and toggled when icon is clicked again', function() {
				$('a.menu-icon-link').trigger('click');
				expect($('body').hasClass('menu-hidden')).toBe(false);
				$('a.menu-icon-link').trigger('click');
				expect($('.menu-hidden').hasClass('menu-hidden')).toBe(true);
			});
		});

		describe("Initial Entries", function() {
			/* Ensure that loadFeed function is called and completes its work,
			 * there is at least a single .entry element within the .feed container.
			 * Remember, loadFeed() is asynchronous so this test will require
			 * the use of Jasmine's beforeEach and asynchronous done() function.
			 */
			beforeEach(function(done) {
				loadFeed(0, done);
			});

			/* Here we have to make sure we call the success callback function done()
			 *to inform jasmine that before each block is finished
			 */
			it('should have 1 or more entries in a container', function(done){
				expect($('.feed .entry').length).toBeGreaterThan(1);
				done();
			});
		});

		describe("New Feed Selection", function() {
			/* Ensure when a new feed is loaded by the loadFeed function
			 * that the content actually changes asynchrounously
			 */
			var feedA, feedB;

			beforeEach(function(done){
				$('.feed').empty();
				loadFeed(0, function() {
					feedA = $('.feed').find("h2").text();
					loadFeed(1, done);
				});
			});

			it('Ensure different feeds are loaded asynchrounously', function() {
				feedB = $('.feed').find("h2").text();
				expect(feedA).not.toBe(feedB);
			});
		});
}());
