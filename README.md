
# Land Scrapping Location

this project is web scrapping to scrap location from https://landsmaps.dol.go.th develop by nodejs, puppeteer, docker 

## Quick Start

To start the app:

1. Install [docker-compose](https://docs.docker.com/compose/install/) on the docker host.
1. Clone this repo on the docker host.
```bash
docker compose up 
```

To Stop the app
```bash
docker compose down 
```

## Usage
Call URL with GET medthod /land/locations

```
query: {
    "province": string,
    "district": string,
    "deedNo": number
}
```

You must send ApiKey in headers. 
```
    "x-api-key": APIKEY
```

## License

[MIT](https://choosealicense.com/licenses/mit/)


