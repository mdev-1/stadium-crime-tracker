# ⚽️ Stadium Crime Tracker

Jamstack application created by Matt Gannon.

## 🧑‍💻 Overview

Technologies used include:

- Node
- Express
  - Axios
    - Request throttling to avoid rate limiting
  - ES6+ features
- React
  - Axios
  - Functional components
  - Hooks (useState, useEffect)
  - React Router
  - Material UI
  - ES6+ features

## 🚀 Running this project

You will need both the server and the client running.

**Server**

- Create `/server/config/default.json` from the `default.dist.json` and add your football-data.org API key
- cd into `/server` and run `npm install && npm start`

**Client**

- cd into `/client` and run `npm install && npm start`

## ✨ API

There are two API endpoints.

**Get all teams**

Request: `GET http://localhost:5000/api/teams`

Response:

```javascript
[
  {
    name: "Arsenal FC",
    venue: "Emirates Stadium",
    address: "75 Drayton Park London N5 1BU",
    formattedPostcode: "N51BU",
    slug: "arsenal-fc",
    latLong: {
      lat: 51.556667,
      long: -0.106371
    }
  },
  {
    name: "Aston Villa FC",
    venue: "Villa Park",
    address: "Villa Park Birmingham B6 6HE",
    formattedPostcode: "B66HE",
    slug: "aston-villa-fc",
    latLong: {
      lat: 52.508486,
      long: -1.884946
    }
  },
  ...
]
```

**Get single team with crimes for a given year**

Request: `GET http://localhost:5000/api/team/[team slug]/crime-year/[year]`

Response:

```javascript
{
  name: "Arsenal FC",
  venue: "Emirates Stadium",
  address: "75 Drayton Park London N5 1BU",
  formattedPostcode: "N51BU",
  slug: "arsenal-fc",
  latLong: {
    lat: 51.556667,
    long: -0.106371
  },
  crimes: [
    {
      id: 89873700,
      category: "Anti-social behaviour",
      outcomeStatus: "Unknown",
      outcomeDate: "N/A",
      month: "2021-01"
    },
    {
      id: 89873702,
      category: "Anti-social behaviour",
      outcomeStatus: "Unknown",
      outcomeDate: "N/A",
      month: "2021-01"
    },
    ...
  ]
}
```

## ⌨️ Client

There are two client screens.

**View all teams**

`http://localhost:3000`

**View single team**

`http://localhost:3000/team/[team slug]`

## 📝 General notes

- I saw different rate limiting on the Police API than they have in their documentation. The documentation states a rate limit of 15 requests per second, with a burst of 30. In my testing I found 12 requests per second was generally reliable, however 13+ quite consistently gave me a 429. I implemented throttling in axios interceptors to handle this.
- I've supported all dates available from the Police API. It seemed to be undocumented but I found it provides the previous 3 years of data (i.e. 2018-04 to 2021-04).

## 📈 To do & future feature ideas

- Update to TS and add models for data entities (i.e. Team, Stadium, Crime)
- General improvements to structure and design
- Add more tests inc. mocking APIs (you can only run a single client test currently with `npm test`)
- Make the client year selection dynamic (everything else should be already)
- More graceful error handling
- Feature idea: Analysis on data e.g. in months when a team lost more games at home were there more or less crimes?
- Consider adding caching layer as data won't change very often
