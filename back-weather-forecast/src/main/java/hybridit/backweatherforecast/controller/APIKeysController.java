package hybridit.backweatherforecast.controller;

import hybridit.backweatherforecast.dto.APIKeyDTO;
import hybridit.backweatherforecast.service.APIKeyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/keys")
public class APIKeysController {

    private final APIKeyService apiKeyService;

    public APIKeysController(APIKeyService apiKeyService) {
        this.apiKeyService = apiKeyService;
    }

    //TODO: implement authentication and authorization for access to keys
    @RequestMapping(value = "/weather-key", method = RequestMethod.GET)
    public ResponseEntity<APIKeyDTO> getOpenWeatherKey() {
        String key = apiKeyService.getOpenWeatherKey();
        return ResponseEntity.ok(new APIKeyDTO(key));
    }

    @RequestMapping(value = "/location-key", method = RequestMethod.GET)
    public ResponseEntity<APIKeyDTO> getLocationIQKey() {
        String key = apiKeyService.getLocationIQKey();
        return ResponseEntity.ok(new APIKeyDTO(key));
    }
}
