package ecommerce.modules.settings.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SocialLinksRequest {
    private String facebookUrl;
    private String twitterUrl;
    private String instagramUrl;
    private String linkedinUrl;
    private String youtubeUrl;
    private String tiktokUrl;
    private String pinterestUrl;
    private String whatsappNumber;
}
