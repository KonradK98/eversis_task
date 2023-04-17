## Task description

Create UI for the open source Nominatim geocoding engine API (https://nominatim.openstreetmap.org/).
User should be able to search for places that one wants to visit, discover their details (offered by Nominatim API) and view the location on the external, Open Street Maps tool (https://www.openstreetmap.org/). Look for general scope screenshots in "places-task/screenshots" directory.

Application is based on Next.js framework (React), supported by Chakra UI, TypeScript syntax and Lint code validator. Yarn is used as default package manager.

Scope:

1. Create API connection for search and details endpoints
2. Handle situation where there are no results in API response
3. Use existing PlaceTableRow component to display the list with its features
4. Build appContext to persist search results and phrase
5. Fix "Clear results" button behaviour - it should clear out the results and phrase
6. Prepare new "bookmarks" feature, which will let user to store ones favourite places on separate page (keep the look&feel of other application pages):
   - add third button with star-shaped icon into actions column (search results)
   - button should have two states, marked with different colors: active (when place is on the bookmarks list) and inactive (when not on the bookmarks list)
   - button color should change on the fly when pressed
   - create new "bookmarks" page with the list of favourite places (use the same features as on the search list)
   - propose a place in the app layout for a link to the "bookmarks" page - user should be able to go there all the time using the app
   - use browsers memory to store the list of favourite places when user will get back to the app in the future
