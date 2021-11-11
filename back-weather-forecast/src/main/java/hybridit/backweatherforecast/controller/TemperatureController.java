package hybridit.backweatherforecast.controller;

import hybridit.backweatherforecast.dto.AverageTemperatureDTO;
import hybridit.backweatherforecast.service.TemperatureReadingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/average-temperatures")
public class TemperatureController {

    private final TemperatureReadingService temperatureReadingService;

    public TemperatureController(TemperatureReadingService temperatureReadingService) {
        this.temperatureReadingService = temperatureReadingService;
    }

    @Operation(summary = "Get average temperature for cities in a given time range")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Average temperatures found")})
    @GetMapping
    public ResponseEntity<List<AverageTemperatureDTO>> getAverageTemperatures
            (@Parameter(description = "List of cities we want to get average temperature for separated by comma") @RequestParam(required = false) List<String> cities,
             @Parameter(description = "Starting point of period (in miliseconds since january 1st 1970) for which we want average temperature ") @RequestParam Long from,
             @Parameter(description = "Ending point of period (in miliseconds since january 1st 1970) for which we want average temperature") @RequestParam Long to,
             @Parameter(description = "Order in which to sort cities by average temperature, ASC or DESC") @RequestParam(required = false) String order) {
        List<AverageTemperatureDTO> list = temperatureReadingService.getAverageTemperatures(cities, from, to, order);
        return ResponseEntity.ok(list);
    }
}
