package hybridit.backweatherforecast.dto.openweather;

public class MomentTemperatureDTO {

    private Long dt;

    private TemperatureDTO main;

    public MomentTemperatureDTO() {
    }

    public TemperatureDTO getMain() {
        return main;
    }


    public Long getDt() {
        return dt;
    }

}
