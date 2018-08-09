## USER STORIES
## Technologies Used
Full stack application using Express, Node.js, Bootstrap and LESS. <br>
Google Fonts and Material.io for styling.<br>
Balsalmiq wire framing and Trello for organizing workflow. <br>

## Approach Taken
We sought to create a music event sharing app for musicians to share information about upcoming gigs. <br>

Initial capabilities are a user profile. From here, users can register as an "artist". Once an artist profile has been created, events can be created and members can be added to artist profile.<br>

Events, artists and users can all be browsed on separate index pages, where a profile picture and name are displayed. To view more information about another user, an artist or an event, a user must be logged in or register. <br>

Our models include: Artist, User and Event. <br>

Views include index, show, edit and new for each model. <br>

Our app also includes an auth view as a landing page where a user can log in or register and a carousel displays current users, artists and events at random. <br>

## Unsolved problems and future possibilities
An ability to add or remove artists from an event. <br>
Search and sort functionality with a search bar and filters. <br>

## SCREENSHOTS
Landing Page:
![Image of Landing Page](screenshots/landing_page.png)

Login Modal:
![Image of Login Modal](screenshots/login_modal.png)

Index (Events):
![Image of Events Index](screenshots/index2.png)

Show (Artist):
![Image of Artist Show](screenshots/artist_show.png)

Show (Adding User to Artist):
![Image of Artist Add](screenshots/artist_show2.png)

New (Artist):
![Image of New Artist Form](screenshots/new_form.png)

Logout Message:
![Image of Logout Message](screenshots/logout_msg.png)



### MVP

Artist: <br>
-- params: name (required), password, location, genre, description, members, website link, photo <br>
-- Artist will be able to create, delete, and edit events <br>
-- Artist will be able to invite users to have access to the artist page <br>
-- Index: a list of all events they've created, button to create event, edit artist details <br>
-- Show: Details of the event, along with an edit and delete button <br>
-- Edit: Be able to edit Artist info <br>

Event: <br>
-- params: date, time, location, description, cost, other artists performing, how many people attending, photo <br>
-- Index: a list of all events <br>
-- Show: Details of an event to learn more about it <br>
-- Edit: Be able to Edit Event Info <br>
-- New: Create a new event <br>

User: <br>
-- params: username, password, location <br>
-- be able to view event index <br>
-- be able to like it <br>
-- mark if they're attending or interested in going <br>
-- User will be able to become an artist <br>
-- Index: toggle between a list of events and artists (later, include a search/filter function), will be able to register as an artist <br>
-- Show: A list of events they've interacted with <br>
-- Edit: Be able to change the user information if they want <br>

User registration: <br>
-- User creates a username, password, registers an email <br>
-- User gets redirected to the user index <br>



## Wireframes

Landing Page:
![Image of Landing Page Wireframe](wireframes/landing_page_wireframe.png)

User Registration:
![Image of User Registration Wireframe](wireframes/user_artist_registration.png)

User Login:
![Image of User Login Wireframe](wireframes/user_login_wireframe.png)

User Index:
![Image of User Index](wireframes/user_index_wireframe.png)

Artist Registration:
![Image of Artist Registration](wireframes/user_artist_registration.png)

Artist Index:
![Image of Artist Index Wireframe](wireframes/artist_index.wireframe.png)

Artist Create Event:
![Image of Artist Create Event Wireframe](wireframes/create_event_wireframe.png)

Artist Invite User:
![Image of Artist Invite User Wireframe](wireframes/artist_invite_users_wireframe.png)

Artist Edit Event:
![Image of Artist Edit Event Wireframe](wireframes/edit_event_wireframe.png)

Event Index:
![Image of Events Index Wireframe](wireframes/events_index_wireframe.png)

Event By Location:
![Image of Events by Location Wireframe](wireframes/wireframe_search_by_location.png)
