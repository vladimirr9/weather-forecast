package hybridit.backweatherforecast.dto.openweather;

import java.util.List;

public class OpenWeatherResponseDTO {
    private CityDTO city;
    private List<MomentTemperatureDTO> list;

    public OpenWeatherResponseDTO() {
    }

    public CityDTO getCity() {
        return city;
    }

    public List<MomentTemperatureDTO> getList() {
        return list;
    }


}
