package hybridit.backweatherforecast.repository;

import hybridit.backweatherforecast.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
