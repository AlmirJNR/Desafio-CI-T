Feature: Search in Database for questions
Scenario: Search for existing question
Given that i browse to the search questions page
And type 'Science: Computers' in the search field
And select 'Category' in the category filter option
When click in the search button
Then i see a table with 25 questions and a navigation bar at the bottom