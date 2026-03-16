package ecommerce.modules.user.mapper;

import ecommerce.common.enums.AddressType;
import ecommerce.modules.user.dto.AddressCreateRequest;
import ecommerce.modules.user.dto.AddressDto;
import ecommerce.modules.user.dto.AddressRequest;
import ecommerce.modules.user.entity.Address;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AddressMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "addressType", source = "type", qualifiedByName = "mapAddressType")
    Address toEntity(AddressRequest request);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "addressType", source = "addressType", qualifiedByName = "mapAddressType")
    Address toEntity(AddressCreateRequest request);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(@MappingTarget Address address, AddressRequest request);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(@MappingTarget Address address, AddressCreateRequest request);

    AddressDto toDto(Address address);

    @Named("mapAddressType")
    default AddressType mapAddressType(String addressType) {
        if (addressType == null || addressType.isBlank()) {
            return AddressType.SHIPPING;
        }
        try {
            return AddressType.valueOf(addressType.toUpperCase());
        } catch (IllegalArgumentException e) {
            return AddressType.SHIPPING;
        }
    }

    @Named("mapStringToAddressType")
    default AddressType mapStringToAddressType(String addressType) {
        return mapAddressType(addressType);
    }
}
