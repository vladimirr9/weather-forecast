package hybridit.backweatherforecast.config;

import hybridit.backweatherforecast.dto.OpenWeatherResponseDTO;
import hybridit.backweatherforecast.model.City;
import hybridit.backweatherforecast.model.TemperatureReading;
import hybridit.backweatherforecast.service.APIKeyService;
import hybridit.backweatherforecast.service.CityService;
import hybridit.backweatherforecast.service.TemperatureReadingService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.TimeUnit;

import static hybridit.backweatherforecast.Constants.OPEN_WEATHER_API_URL_TEMPLATE;

@Configuration
public class InitConfig {
    private APIKeyService apiKeyService;
    private CityService cityService;
    private TemperatureReadingService temperatureReadingService;

    public InitConfig(APIKeyService apiKeyService, CityService cityService, TemperatureReadingService temperatureReadingService) {
        this.apiKeyService = apiKeyService;
        this.cityService = cityService;
        this.temperatureReadingService = temperatureReadingService;
    }

    // for loading initial data into the database
    @Bean
    public CommandLineRunner run(RestTemplate restTemplate) throws Exception {
        return args -> {
            String[] cityNames = {"Utrecht", "Amsterdam", "Eindhoven"};
            for (var cityName : cityNames) {
                String URL = String.format(OPEN_WEATHER_API_URL_TEMPLATE, cityName, apiKeyService.getOpenWeatherKey());
                //TODO: validation for OpenWeatherResponse
                OpenWeatherResponseDTO response = restTemplate.getForObject(URL, OpenWeatherResponseDTO.class);
                City city = new City(response.getCity().getName());
                City persistedCity = cityService.save(city);
                for (var temperatureReadingDTO : response.getList()) {
                    TemperatureReading temperatureReading = new TemperatureReading(persistedCity,
                            temperatureReadingDTO.getMain().getTemp(),
                            TimeUnit.SECONDS.toMillis(temperatureReadingDTO.getDt()));
                    temperatureReadingService.save(temperatureReading);
                }
            }
        };
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}
