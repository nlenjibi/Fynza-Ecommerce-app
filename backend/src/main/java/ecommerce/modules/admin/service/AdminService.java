package ecommerce.modules.admin.service;

import ecommerce.modules.admin.dto.AdminAnalyticsDto;
import ecommerce.modules.admin.dto.AdminDashboardDto;


public interface AdminService {
    AdminDashboardDto getDashboardStats();

    AdminAnalyticsDto getAnalytics(String filterPeriod);
}
