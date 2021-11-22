Feature: Search in Database for questions
Scenario: Search for inexistent question
Given that i browse to the search questions page
And type 'Science: Computers' in the search field
When click in the search button
Then i see a message with an error text: 'No questions found.'