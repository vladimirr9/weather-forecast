package hybridit.backweatherforecast.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import hybridit.backweatherforecast.dto.AverageTemperatureDTO;
import hybridit.backweatherforecast.service.TemperatureReadingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/average-temperatures")
public class TemperatureController {

    private final TemperatureReadingService temperatureReadingService;

    public TemperatureController(TemperatureReadingService temperatureReadingService, ObjectMapper objectMapper) {
        this.temperatureReadingService = temperatureReadingService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<AverageTemperatureDTO>> getAverageTemperatures
            (@RequestParam(required = false) List<String> cities,
             @RequestParam Long from,
             @RequestParam Long to,
             @RequestParam(required = false) String order) {
        List<AverageTemperatureDTO> list = temperatureReadingService.getAverageTemperatures(cities, from, to, order);
        return ResponseEntity.ok(list);
    }
}
