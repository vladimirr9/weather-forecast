package hybridit.backweatherforecast.repository;

import hybridit.backweatherforecast.dto.AverageTemperatureDTO;
import hybridit.backweatherforecast.model.TemperatureReading;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface TemperatureReadingRepository extends JpaRepository<TemperatureReading, Long> {
    @Query("SELECT new hybridit.backweatherforecast.dto.AverageTemperatureDTO(c.id, c.name, avg(tr.temperature) as average)\n" +
            "FROM TemperatureReading tr JOIN City c ON c.id = tr.city.id\n" +
            "WHERE ((:cities) is null or c.name IN (:cities)) AND tr.time BETWEEN :from AND :to\n" +
            "GROUP BY c\n")
    public List<AverageTemperatureDTO> getAverageTemperatureForCities(@Param("cities") List<String> cities, @Param("from") Date from, @Param("to") Date to, Sort sort);
}
