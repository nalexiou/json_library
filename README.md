# Library for All Project

I have completed the challenge using a bare Sinatra (Ruby) framework to serve the content. The majority of the code is based on HTML, CSS, Javascript/JQuery, and the Datatables plugin for jQuery which provides a lot of different features that are helpful when displaying the json data as a table.

To view what I created, please visit: http://lfaproject.herokuapp.com

Below are a list of features I incorporated that I believe would be helpful in navigating the Library for All content.

1. Allow users to search content through all the data we are interested in (book title, author, editor, tags, etc.)

2. Allow users to filter using drop down filters for each category (minimum resolution: tablets)

3. Allow users to click on each author, tag, subject hyperlink and display all those that titles that belong under that selection.

4. Since different users (teachers, students) will most likely have different needs (teachers might need more info while students less), I put a considerable amount of effort on the responsive design. Here are some data I displayed based on device used
   a. Mobile only: Name and Author is combined using the Information column
   b. Tablet minimum: Name and Author is displayed
   c. Desktop: Display Tags and Subjects

5. Collapse summary, editor in all views to allow for a clean interface. When summary is not available, N/A is displayed

6. Provide pagination to easily refer to a specific page

7. Allow users to display how many entries there should be shown to minimize scrolling if needed.

8. Allow sorting books by clicking column title.

9. Provide clearing of applied filters.

10. Json data requested through AJAX request allowing information to be cached/served on the client.

In terms of testing the functionality, I would most likely use a framework such as Jasmine and along with PhantomJS to provide Unit tests and user functionality tests. In terms of data displayed, I would emulate the various devices and make sure what is displayed on the screen to the user matches the expectations. In terms of interactivity, I would emulate clicking various elements (selectors, search, hyperlinks) and compare the results on the screen with what is expected.

Overall, this was a nice challenge for the frontend and becoming familiar with the DataTable plugin allowed me to generate a lot of the ideas/features I had about improving the display of the Library for All content.

Thank you!

Nick Alexiou


