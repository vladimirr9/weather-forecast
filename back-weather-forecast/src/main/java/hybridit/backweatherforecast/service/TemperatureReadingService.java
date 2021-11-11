package hybridit.backweatherforecast.service;

import hybridit.backweatherforecast.dto.AverageTemperatureDTO;
import hybridit.backweatherforecast.model.TemperatureReading;
import hybridit.backweatherforecast.repository.TemperatureReadingRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class TemperatureReadingService {
    private final TemperatureReadingRepository repository;


    public TemperatureReadingService(TemperatureReadingRepository repository) {
        this.repository = repository;
    }

    public TemperatureReading save(TemperatureReading temperatureReading) {
        return repository.save(temperatureReading);
    }

    public List<AverageTemperatureDTO> getAverageTemperatures(List<String> cities, Long from, Long to, String order) {
        Sort sort = switch (Objects.isNull(order) ? "" : order) {
            case "ASC" -> Sort.by("average").ascending();
            case "DESC" -> Sort.by("average").descending();
            default -> Sort.unsorted();
        };
        return new ArrayList<>(repository.getAverageTemperatureForCities(cities, new Date(from), new Date(to), sort));
    }
}
