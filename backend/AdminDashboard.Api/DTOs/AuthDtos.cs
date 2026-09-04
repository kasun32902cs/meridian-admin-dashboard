using System.ComponentModel.DataAnnotations;

namespace AdminDashboard.Api.DTOs;

public record LoginRequest(
    [property: Required, EmailAddress] string Email,
    [property: Required] string Password
);

public record RegisterRequest(
    [property: Required] string FullName,
    [property: Required, EmailAddress] string Email,
    [property: Required, MinLength(8)] string Password
);

public record AuthResponse(
    string Token,
    DateTime ExpiresAt,
    UserDto User
);
