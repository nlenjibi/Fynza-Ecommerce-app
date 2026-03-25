package ecommerce.graphql.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SocialLinks {
    private String id;
    private String facebook;
    private String twitter;
    private String instagram;
    private String youtube;
    private String linkedin;
    private String pinterest;
    private String tiktok;
    private String whatsapp;
    private String telegram;
    private Boolean isActive;
}
