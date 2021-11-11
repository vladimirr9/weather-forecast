package hybridit.backweatherforecast.dto;

public class APIKeyDTO {
    private String key;

    public APIKeyDTO() {
    }

    public APIKeyDTO(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}
