package hybridit.backweatherforecast.dto;

public class AverageTemperatureDTO {
    private Long cityID;
    private String cityName;
    private Double averageTemperature;

    public AverageTemperatureDTO() {
    }

    public AverageTemperatureDTO(Long cityID, String cityName, Double averageTemperature) {
        this.cityID = cityID;
        this.cityName = cityName;
        this.averageTemperature = averageTemperature;
    }

    public Long getCityID() {
        return cityID;
    }

    public String getCityName() {
        return cityName;
    }

    public Double getAverageTemperature() {
        return averageTemperature;
    }
}
