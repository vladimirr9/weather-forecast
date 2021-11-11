package hybridit.backweatherforecast.service;

import org.springframework.stereotype.Service;

@Service
public class APIKeyService {
    //TODO: secure these keys in a database instead of keeping them in code
    public String getOpenWeatherKey() {
        return "02e87ff3683c0f032eb705da30b5bf18";
    }

    public String getLocationIQKey() {
        return "pk.f9971de5a5f0723a1b85387f671c4857";
    }
}
