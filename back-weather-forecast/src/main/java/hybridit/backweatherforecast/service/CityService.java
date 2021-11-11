package hybridit.backweatherforecast.service;

import hybridit.backweatherforecast.model.City;
import hybridit.backweatherforecast.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    private final CityRepository repository;

    public CityService(CityRepository cityRepository) {
        this.repository = cityRepository;
    }

    public City save(City city) {
        return repository.save(city);
    }

    public List<City> getAvailableCities() {
        return repository.findAll();
    }

}
