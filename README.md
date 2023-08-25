# CurrentCentral: Energy Data Visualization and Organization Hierarchy Management

Welcome to the CurrentCentral project! This comprehensive full-stack application is designed to efficiently manage organization hierarchies and offer insightful dashboards for visualizing energy data collected from various IoT sensors across different entities. Through a combination of SQL, InfluxDB, ReactJS, ChartJS, and NodeJS technologies, we provide a seamless experience for users interested in exploring energy consumption trends.

## Installation Guide

To set up and run the CurrentCentral project on your local machine, please adhere to the following steps:

1. **Clone the Repository:** Begin by cloning this repository onto your local system.
2. **Install Dependencies:** Navigate to the root directory of the project using your terminal and execute the command `npm install` to install all required dependencies.
3. **Database Setup:** Set up both the SQL and InfluxDB databases and tables as per the defined schemas in the `db/schema.sql` and `db/influx-schema.txt` files respectively.
4. **Environment Variables:** Create a `.env` file in the project's root directory. Configure the following variables within the file:
   - `DB_HOST`: Hostname of your SQL database
   - `DB_USER`: Username for your SQL database
   - `DB_PASSWORD`: Password for your SQL database
   - `INFLUX_HOST`: Hostname of your InfluxDB database
   - `INFLUX_USER`: Username for your InfluxDB database
   - `INFLUX_PASSWORD`: Password for your InfluxDB database
   - `NODE_ENV`: Set to either "development" or "production"
5. **Initiate the Server:** Launch the NodeJS server and deploy the ReactJS frontend by executing `npm run start` in your terminal.
6. **Preview the Project:** Open your web browser and navigate to http://localhost:3000 to explore the project.

## Project Usage

The CurrentCentral project offers users the ability to visualize energy consumption data gathered from diverse IoT sensors across multiple entities. Moreover, it facilitates the management and visualization of an organization's hierarchical structure.

### Exploring the Organization Hierarchy

To view the organization's hierarchical layout, simply access the "Landing" page. Here, an intuitive tree view presents each node as an organizational unit. By clicking on a node, you can expand or collapse its child units, offering a comprehensive overview.

### Analyzing Energy Data Visualization

For comprehensive energy data visualizations, navigate to the "Dashboard" section within the sidebar. This dashboard showcases charts for each IoT sensor associated with every entity. Users can tailor the chart's time range using the date picker situated at the page's top. Additionally, to gain deeper insights into a specific sensor's data, click on its name in the chart's legend. This action will unveil a modal window displaying a detailed chart alongside supplementary sensor information.

## Project Author

For any inquiries or feedback, feel free to contact the author of the project:

**Rishabh Indoria**

Email: indoria.r@northeastern.edu

## License Information

This project operates under the [MIT License](./LICENSE). To understand the rights and permissions, refer to the provided badge.
