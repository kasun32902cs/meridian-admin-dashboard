using AdminDashboard.Api.Models;

namespace AdminDashboard.Api.DTOs;

public record UserDto(
    int Id,
    string FullName,
    string Email,
    UserRole Role,
    bool IsActive,
    DateTime CreatedAt,
    DateTime? LastLoginAt
);

public record UpdateUserRequest(
    string FullName,
    UserRole Role,
    bool IsActive
);
