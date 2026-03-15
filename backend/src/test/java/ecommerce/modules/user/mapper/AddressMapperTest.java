package ecommerce.modules.user.mapper;

import ecommerce.common.enums.AddressType;
import ecommerce.modules.user.dto.AddressCreateRequest;
import ecommerce.modules.user.dto.AddressDto;
import ecommerce.modules.user.entity.Address;
import ecommerce.modules.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class AddressMapperTest {

    private AddressMapper addressMapper;

    @BeforeEach
    public void setUp() {
        addressMapper = Mappers.getMapper(AddressMapper.class);
    }

    @Test
    public void testToEntity() {
        // Given
        AddressCreateRequest request = AddressCreateRequest.builder()
                .label("Home")
                .streetAddress("123 Main Street")
                .city("New York")
                .state("NY")
                .postalCode("10001")
                .country("USA")
                .addressType("SHIPPING")
                .isDefault(true)
                .build();

        // When
        Address address = addressMapper.toEntity(request);

        // Then
        assertNotNull(address);
        assertEquals("Home", address.getLabel());
        assertEquals("123 Main Street", address.getStreetAddress());
        assertEquals("New York", address.getCity());
        assertEquals("NY", address.getState());
        assertEquals("10001", address.getPostalCode());
        assertEquals("USA", address.getCountry());
        assertEquals(AddressType.SHIPPING, address.getAddressType());
        assertTrue(address.getIsDefault());
    }

    @Test
    public void testToEntity_NullAddressType() {
        // Given
        AddressCreateRequest request = AddressCreateRequest.builder()
                .streetAddress("123 Main Street")
                .city("New York")
                .state("NY")
                .postalCode("10001")
                .country("USA")
                .build();

        // When
        Address address = addressMapper.toEntity(request);

        // Then
        assertNotNull(address);
        assertEquals(AddressType.SHIPPING, address.getAddressType());
    }

    @Test
    public void testToEntity_InvalidAddressType() {
        // Given
        AddressCreateRequest request = AddressCreateRequest.builder()
                .streetAddress("123 Main Street")
                .city("New York")
                .state("NY")
                .postalCode("10001")
                .country("USA")
                .addressType("INVALID_TYPE")
                .build();

        // When
        Address address = addressMapper.toEntity(request);

        // Then
        assertNotNull(address);
        assertEquals(AddressType.SHIPPING, address.getAddressType());
    }

    @Test
    public void testToEntity_BillingAddressType() {
        // Given
        AddressCreateRequest request = AddressCreateRequest.builder()
                .streetAddress("123 Main Street")
                .city("New York")
                .state("NY")
                .postalCode("10001")
                .country("USA")
                .addressType("BILLING")
                .build();

        // When
        Address address = addressMapper.toEntity(request);

        // Then
        assertNotNull(address);
        assertEquals(AddressType.BILLING, address.getAddressType());
    }

    @Test
    public void testToDto() {
        // Given
        UUID userId = UUID.randomUUID();
        User user = User.builder()
                .id(userId)
                .email("test@example.com")
                .firstName("John")
                .lastName("Doe")
                .build();

        Address address = Address.builder()
                .id(UUID.randomUUID())
                .user(user)
                .label("Office")
                .streetAddress("456 Business Ave")
                .city("San Francisco")
                .state("CA")
                .postalCode("94102")
                .country("USA")
                .addressType(AddressType.BILLING)
                .isDefault(false)
                .build();

        // When
        AddressDto dto = addressMapper.toDto(address);

        // Then
        assertNotNull(dto);
        assertEquals(address.getId(), dto.getId());
        assertEquals("Office", dto.getLabel());
        assertEquals("456 Business Ave", dto.getStreetAddress());
        assertEquals("San Francisco", dto.getCity());
        assertEquals("CA", dto.getState());
        assertEquals("94102", dto.getPostalCode());
        assertEquals("USA", dto.getCountry());
        assertEquals(AddressType.BILLING, dto.getAddressType());
        assertFalse(dto.getIsDefault());
    }

    @Test
    public void testUpdateEntity() {
        // Given
        Address existingAddress = Address.builder()
                .id(UUID.randomUUID())
                .label("Old Label")
                .streetAddress("Old Street")
                .city("Old City")
                .state("OL")
                .postalCode("00000")
                .country("Old Country")
                .addressType(AddressType.SHIPPING)
                .isDefault(false)
                .build();

        AddressCreateRequest request = AddressCreateRequest.builder()
                .label("New Label")
                .streetAddress("New Street")
                .city("New City")
                .state("NW")
                .postalCode("99999")
                .country("New Country")
                .addressType("BILLING")
                .isDefault(true)
                .build();

        // When
        addressMapper.updateEntity(existingAddress, request);

        // Then
        assertEquals("New Label", existingAddress.getLabel());
        assertEquals("New Street", existingAddress.getStreetAddress());
        assertEquals("New City", existingAddress.getCity());
        assertEquals("NW", existingAddress.getState());
        assertEquals("99999", existingAddress.getPostalCode());
        assertEquals("New Country", existingAddress.getCountry());
        assertEquals(AddressType.BILLING, existingAddress.getAddressType());
        assertTrue(existingAddress.getIsDefault());
    }

    @Test
    public void testMapAddressType_Null() {
        // When
        AddressType result = addressMapper.mapAddressType(null);

        // Then
        assertEquals(AddressType.SHIPPING, result);
    }

    @Test
    public void testMapAddressType_Blank() {
        // When
        AddressType result = addressMapper.mapAddressType("   ");

        // Then
        assertEquals(AddressType.SHIPPING, result);
    }

    @Test
    public void testMapAddressType_LowerCase() {
        // When
        AddressType result = addressMapper.mapAddressType("billing");

        // Then
        assertEquals(AddressType.BILLING, result);
    }
}
