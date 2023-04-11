# CurrentCentral
This full stack project maintains the organization hierarchy and creates dashboards for energy data visualization of different IOT sensors for every entity. The tech stack includes SQL (for client data), InfluxDB (for time-series IOT data), ReactJS (for front-end), ChartJS (for creating dashboard graphs), and NodeJS (for back-end).

## Installation
To install and run this project locally, please follow these steps:

* Clone this repository to your local machine.
* Navigate to the project root directory and run npm install.
* Set up the SQL and InfluxDB databases and tables according to the schema defined in the db/schema.sql and db/influx-schema.txt files, respectively.
* Create a .env file in the root directory with the following variables:
  * DB_HOST: the hostname of your SQL database
  * DB_USER: the username for your SQL database
  * DB_PASSWORD: the password for your SQL database
  * INFLUX_HOST: the hostname of your InfluxDB database
  * INFLUX_USER: the username for your InfluxDB database
  * INFLUX_PASSWORD: the password for your InfluxDB database
  * NODE_ENV: set to development or production
* Run npm run start to start the NodeJS server and serve the ReactJS frontend.
* Navigate to http://localhost:3000 in your browser to view the project.

## Usage
This project allows users to view energy data visualizations for different IOT sensors for every entity. The hierarchy of the organization can also be viewed and managed.

## Organization Hierarchy
To view the organization hierarchy, navigate to the Landing page. The hierarchy is displayed as a tree view, with each node representing an organization unit. Clicking on a node will expand or collapse its children.

## Energy Data Visualization
To view energy data visualizations, navigate to the "Dashboard" tab in the sidebar. The dashboard displays a chart for each IOT sensor for every entity. Users can select the time range for the chart using the date picker at the top of the page. To view more detailed information for a specific sensor, click on the sensor name in the chart legend. This will display a modal with a detailed chart and additional sensor information.

## Author

[Rishabh Indoria](mailto:indoria.r@northeastern.edu)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
