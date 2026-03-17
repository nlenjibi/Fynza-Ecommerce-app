package ecommerce.graphql.resolver;

import ecommerce.modules.coupon.dto.CouponRequest;
import ecommerce.modules.coupon.dto.CouponResponse;
import ecommerce.modules.coupon.mapper.CouponMapper;
import ecommerce.modules.coupon.service.CouponService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
public class CouponResolver {

    private final CouponService couponService;
    private final CouponMapper couponMapper;

    @QueryMapping
    public List<CouponResponse> coupons() {
        log.info("GraphQL Query: coupons");
        return couponService.findAll();
    }

    @QueryMapping
    public CouponResponse coupon(@Argument UUID id) {
        log.info("GraphQL Query: coupon(id: {})", id);
        return couponService.findById(id);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public CouponResponse createCoupon(@Argument CouponRequest input) {
        log.info("GraphQL Mutation: createCoupon(code: {})", input.getCode());
        return couponService.create(input);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public CouponResponse updateCoupon(@Argument UUID id, @Argument CouponRequest input) {
        log.info("GraphQL Mutation: updateCoupon(id: {})", id);
        return couponService.update(id, input);
    }

    @MutationMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Boolean deleteCoupon(@Argument UUID id) {
        log.info("GraphQL Mutation: deleteCoupon(id: {})", id);
        couponService.delete(id);
        return true;
    }

    @QueryMapping
    public CouponResponse validateCoupon(
            @Argument String code,
            @Argument BigDecimal orderAmount) {
        log.info("GraphQL Query: validateCoupon(code: {}, amount: {})", code, orderAmount);
        return couponMapper.toResponse(couponService.validate(code, orderAmount));
    }
}
