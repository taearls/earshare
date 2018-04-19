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
