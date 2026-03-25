package ecommerce.graphql.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterInput {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phone;
    private String userType;
}
