package ecommerce.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SocialLinksInput {
    private String facebook;
    private String twitter;
    private String instagram;
    private String youtube;
    private String linkedin;
    private String pinterest;
    private String tiktok;
    private String whatsapp;
    private String telegram;
}
