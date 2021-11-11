# Weather Forecast
Implementation of weather forecasting use-case.

## Backend
Implementation in Java using the Spring framework.   
Uses https://openweathermap.org/api to fetch weather information.  
Documentation available after running the backend application on localhost at:  
http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/  
Implemented all use-case requirements.  
Due to very simple business logic in services, testing was limited to integration tests.

## Frontend
Implementation using Angular following the given design.  
Before running the frontend, the backend has to be running, as the first thing that is done is fetching the required API access keys from the backend.  
Implemented all required functionalities. The project uses the https://locationiq.com API to geocode country and city name to geographic coordinates, which are used by the https://openweathermap.org/api to fetch weather infromation.  
The backend is only used to supply the appropriate API keys which are needed to use them. I took this liberty in interpretation of the usecase since the 5-day forecast on the backend is possible only using country and city name, while the 7-day forecast which is needed on the frontend to display all relevant information requires geocoding, and the processing power needed to make all functionalities work is minimal, reducing the need for a backend.  
This geocoding and independence from the backend allowed me to expand the search past the three hardcoded cities predefined in the backend configuration.  