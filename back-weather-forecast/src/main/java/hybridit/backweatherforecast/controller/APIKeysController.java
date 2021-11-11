package hybridit.backweatherforecast.controller;

import hybridit.backweatherforecast.dto.APIKeyDTO;
import hybridit.backweatherforecast.service.APIKeyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/keys")
public class APIKeysController {

    private final APIKeyService apiKeyService;

    public APIKeysController(APIKeyService apiKeyService) {
        this.apiKeyService = apiKeyService;
    }

    //TODO: implement authentication and authorization for access to keys
    @GetMapping(value = "/weather-key")
    @Operation(summary = "Get key to make requests for OpenWeather API")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Key Found")})
    public ResponseEntity<APIKeyDTO> getOpenWeatherKey() {
        String key = apiKeyService.getOpenWeatherKey();
        return ResponseEntity.ok(new APIKeyDTO(key));
    }


    //TODO: nouns in URL in REST should be plural, look into cleaner solution
    @Operation(summary = "Get key to make requests for LocationIQ API")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Key Found")})
    @GetMapping(value = "/location-key")
    public ResponseEntity<APIKeyDTO> getLocationIQKey() {
        String key = apiKeyService.getLocationIQKey();
        return ResponseEntity.ok(new APIKeyDTO(key));
    }
}
