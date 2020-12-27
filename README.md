# View app

[View app](https://tdl-7uvcq.ondigitalocean.app/). Search for your favourite GitHub users and view their profile. Wowee.

## Server

The GitHub API has a pretty low rate limit for unauthenticated requests. Hence, to avoid the user having to login, I've generated a personal account token for GitHub, but also, personal tokens really shouldn't be available in the browser, so I've written a small Express server through which requests can be proxied with the token attached.

The API makes available two endpoints of the GitHub Search API – further endpoints could be easily added to GitHub.ts, or just import the Octokit library.

Error handling middleware avoids sending stack traces to the client and decorators are used to time the onward requests to the GitHub API.

This type of data could definitely be cached (depending on the GitHub API's T&Cs which I have not read). It's easy enough to cache in memory or with a store like Redis (I've written a Redis cache decorator before for another project, which checks if an API response/object is in the cache before making the request, and either returning it if it's there or populating the cache after the request has returned).

It would also have been possible to create a magic endpoint that executes the search and then gets the user data before returning it but :woman_shrugging:.

(To run the server locally you'll need to `npm i`, supply your own environment variable for GITHUB_TOKEN and `npm run start` for development mode watching etc.)

## Client

To run: `npm i` and `npm run start`.

This is a Create React App with Material UI for component styling and React Query for API request management. This is the first time using it, and it evokes similar feelings to using SWR or Apollo Client => loading/error states are handled automatically and queries refetch when their dependent variables change (I've worked a lot with GraphQL/Apollo Client/Server in the past and wanted to try something different).

The URL is used to store the query state (via useURLSearchParams) which makes it easy to share with a friend!

useDebounce prevents the API being called on every keystroke.

I decided that the UserCard components should be able to fetch data about themselves. I could have sent them all in one request, but I would still have needed to split the user ids in Express because the GitHub API doesn't accept an array of ids for that endpoint (http2 requests can be fired concurrently, so we can always batch later if it needs optimising).

## Testing

I've used Testing Library to write a unit test of UserCard (`npm run test`) and written a couple of end-to-end tests with Cypress (`npm run cypress:open`).

## Deployment

This is deployed on Digital Ocean App Platform.
