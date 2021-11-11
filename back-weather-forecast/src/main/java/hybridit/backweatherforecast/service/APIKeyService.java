package hybridit.backweatherforecast.service;

import org.springframework.stereotype.Service;

@Service
public class APIKeyService {
    private static final String OPEN_WEATHER_KEY = "02e87ff3683c0f032eb705da30b5bf18";
    private static final String LOCATION_IQ_KEY = "pk.f9971de5a5f0723a1b85387f671c4857";

    //TODO: secure these keys in a database instead of keeping them in code
    public String getOpenWeatherKey() {
        return OPEN_WEATHER_KEY;
    }

    public String getLocationIQKey() {
        return LOCATION_IQ_KEY;
    }
}
