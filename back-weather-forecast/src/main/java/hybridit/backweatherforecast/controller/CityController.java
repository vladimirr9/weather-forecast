package hybridit.backweatherforecast.controller;

import hybridit.backweatherforecast.model.City;
import hybridit.backweatherforecast.service.CityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/cities")
public class CityController {
    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @Operation(summary = "Get all cities in the system")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "All cities in the system")})
    @GetMapping
    public ResponseEntity<List<City>> getAvailableCities() {
        List<City> cities = cityService.getAvailableCities();
        return ResponseEntity.ok(cities);
    }
}
