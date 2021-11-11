package hybridit.backweatherforecast.controller;

import hybridit.backweatherforecast.model.City;
import hybridit.backweatherforecast.service.CityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/cities")
public class CityController {
    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<City>> getAvailableCities() {
        List<City> cities = cityService.getAvailableCities();
        return ResponseEntity.ok(cities);
    }
}
