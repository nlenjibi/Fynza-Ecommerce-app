package ecommerce.modules.user.mapper;



import ecommerce.common.enums.PaymentMethod;
import ecommerce.modules.user.dto.UserCreateRequest;
import ecommerce.modules.user.dto.UserDto;
import ecommerce.modules.user.dto.UserUpdateRequest;
import ecommerce.modules.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    @Mapping(target = "fullName", expression = "java(user.getFullName())")
    UserDto toDto(User user);

    @Mapping(target = "role", source = "role")
    User toEntity(UserCreateRequest request);

    @Mapping(target = "role", source = "role")
    void updateEntity(@MappingTarget User user, UserUpdateRequest request);

    default PaymentMethod.Role map(String role) {
        if (role == null) return null;
        try {
            return PaymentMethod.Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            return PaymentMethod.Role.CUSTOMER;
        }
    }
}
