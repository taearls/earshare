## User Story

Three Schemas: Artist, Attendee, and Event.

Artist - a musician or band that wants to post an event to spread awareness and invite attendees.

Attendee - people who go to the events

Events - concerts/shows/sets/etc.

### MVP

Artist:
-- params: name (required), password, location, genre, description, members, website link, photo
-- Artist will be able to create, delete, and edit events
-- Index: a list of all events they've created, button to create event, edit artist details
-- Show: Details of the event, along with an edit and delete button

Event:
-- params: date, time, location, description, cost, other artists performing, how many people attending, photo
-- Index: a list of all events
-- Show: Details of an event to learn more about it

Attendee:
-- params: username, password, location
-- be able to view event index
-- be able to like it
-- mark if they're attending or interested in going
-- Index: toggle between a list of events and artists (later, include a search/filter function)
-- Show: A list of events they've interacted with

## Wireframe

![Image of Landing Page Wireframe]
(public/images/wireframes/project_2_wireframes/landing_page_wireframe.png)

![Image of User Registration Wireframe]
(public/images/wireframes/project_2_wireframes/user_artist_registration.png)

![Image of User Login Wireframe]
(public/images/wireframes/project_2_wireframes/user_login_wireframe.png)

![Image of User Index]
(public/images/wireframes/project_2_wireframes/user_index_wireframe.png)

![Image of Artist Registration]
(public/images/wireframes/project_2_wireframes/user_artist_registration.png)

![Image of Artist Index Wireframe]
(public/images/wireframes/project_2_wireframes/artist_index.wireframe.png)

![Image of Artist Create Event Wireframe]
(public/images/wireframes/project_2_wireframes/create_event_wireframe.png)

![Image of Artist Invite User Wireframe]
(public/images/wireframes/project_2_wireframes/artist_invite_users_wireframe.png)

![Image of Artist Edit Event Wireframe]
(public/images/wireframes/project_2_wireframes/edit_event_wireframe.png)

![Image of Events Index Wireframe]
(public/images/wireframes/project_2_wireframes/events_index_wireframe.png)

![Image of Events by Location Wireframe]
(public/images/wireframes/project_2_wireframes/wireframe_search_by_location.png)
