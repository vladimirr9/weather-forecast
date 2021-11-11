package hybridit.backweatherforecast.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class TemperatureReading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double temperature;
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;
    private Date time;

    public TemperatureReading(City city, Double temperature, Long timestamp) {
        this.temperature = temperature;
        this.city = city;
        this.time = new Date(timestamp);
    }

    public TemperatureReading() {
    }

    public Long getId() {
        return id;
    }

    public Double getTemperature() {
        return temperature;
    }

    public City getCity() {
        return city;
    }

    public Date getTime() {
        return time;
    }
}
