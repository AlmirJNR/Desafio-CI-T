Feature: Search in Database for specifc user questions
Scenario: Search for existing user questions
Given that i browse to the search questions page
And type 'mets11rap' in the search field
And select 'User' in the category filter option
When click in the search button
Then i see a table with 24 questions created by the user 'mets11rap'